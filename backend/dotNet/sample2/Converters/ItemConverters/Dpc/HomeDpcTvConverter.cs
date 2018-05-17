using Vendor.Client.WebApp.Controllers.Home;
using Vendor.Client.WebApp.Models.MobileTariffs.TariffParameters;
using Vendor.Core.Enums;
using Vendor.Interface.Data.Convergence;
using Vendor.Interface.Data.HomeTariffs;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Api.Converters.ItemConverters.Dpc
{
    /// <summary>
    /// Класс преобразования тарифа тв из DPC
    /// </summary>
    public class HomeDpcTvConverter : HomeDpcItemConverterBase
    {
        /// <summary>
        /// Преобразует элемент списка продуктов
        /// </summary>
        /// <param name="source">Продукт</param>
        /// <returns></returns>
        public override HomeTariffApiItemViewModel ConvertListItem(
            InacProductBaseDto source)
        {
            var result = base.ConvertListItem(source);

            result.Url = HomeConverterBase.GetUrl(
                HomeCatalogPageController.ActionNameConstants.Tv,
                result.Alias);
            result.IsTvOnly = true;
            result.ProductType = Product.Tv.GetDescription();

            result.HasTv = true;

            result.ChannelCount = GetChannelsCount(
                source.LinkedProducts);

            return result;
        }

        /// <summary>
        /// Преобразует продукт в модель для отображения
        /// </summary>
        /// <param name="source">Продукт</param>
        /// <param name="model">Модель для отображения</param>
        public override void ConvertItem(
           InacProductBaseDto source,
           HomeItemCardViewModel model)
        {
            var result = ((HomeTvTariffViewModel)model);
            result.BaseChannels = GetChannels(
                source,
                new[]
                {
                    MarketingTvPacketDto.TvPacketType.Base
                });

            result.AdvancedPackages = GetPackets(source,
                new[]
                {
                    MarketingTvPacketDto.TvPacketType.Subscription,
                    MarketingTvPacketDto.TvPacketType.Extra,
                    MarketingTvPacketDto.TvPacketType.Service
                });

            result.CustomGroups = GetGroups(source);

            var channels = source?.ProductParams?
                .FirstOrDefault(
                    a => a.BaseParamAlias == DpcBaseParameterType.ChannelCount.GetDescription());

            if (channels != null)
            {
                result.ChannelsCountReplacement = !string.IsNullOrWhiteSpace(channels.TextValue) ?
                    channels.TextValue :
                    Decimal
                        .Truncate((channels.NumberValue ?? 0))
                        .ToString();
            }
        }

        /// <summary>
        /// Возвращает тв-группы
        /// </summary>
        /// <param name="source">Продукт</param>
        /// <returns></returns>
        protected virtual IEnumerable<IGrouping<string, TVPackageGroup>> GetGroups(
            InacProductBaseDto source)
        {
            var packets = GetPackets(
                source,
                new[]
                {
                    MarketingTvPacketDto.TvPacketType.Subscription,
                    MarketingTvPacketDto.TvPacketType.Extra,
                    MarketingTvPacketDto.TvPacketType.Service
                });

            var groups = packets
                .Select(s => new TVPackageGroup
                {
                    Alias = s.PacketType == MarketingTvPacketDto.TvPacketType.Subscription.ToString("G") ?
                        s.PacketType :
                        MarketingTvPacketDto.TvPacketType.Extra.ToString("G"),
                    PackageId = int.Parse(s.Id),
                    SortOrder = s.PacketType == MarketingTvPacketDto.TvPacketType.Subscription.ToString("G") ? 1 : 0,
                    Title = s.PacketType == MarketingTvPacketDto.TvPacketType.Subscription.ToString("G") ?
                        Resources.HomeTariffs.SubscriptionsGroupTitle :
                        Resources.HomeTariffs.ExtraGroupTitle
                });

            return groups
                .OrderBy(s => s.SortOrder)
                .GroupBy(a => a.Alias);
        }

        /// <summary>
        /// Возвращает количество каналов
        /// </summary>
        /// <param name="items">Прилинкованные продукты</param>
        /// <returns></returns>
        public static int GetChannelsCount(
            InacProductBaseDto[] items)
        {
            var result = items?
                .OfType<TvPacketDto>()
                .Where(x => x.MarketingProduct?.PacketType == MarketingTvPacketDto.TvPacketType.Base ||
                    x.IsRequired)
                .Sum(x => x.MarketingProduct?.Channels?.Length ?? 0) ?? 0;

            return result;
        }

        /// <summary>
        /// Возвращает список тв-каналов
        /// </summary>
        /// <param name="source">Продукт</param>
        /// <param name="types">Типы пакетов</param>
        /// <returns></returns>
        public virtual TvChannel[] GetChannels(
            InacProductBaseDto source,
            MarketingTvPacketDto.TvPacketType[] types)
        {
            var result = source?.LinkedProducts?
                .OfType<TvPacketDto>()
                .Where(x => types?.Any(a => a == x.MarketingProduct?.PacketType) ?? false)
                .SelectMany(x => x.MarketingProduct?.Channels)
                .Where(x => x != null)
                .OrderBy(x => x.SortOrder ?? 0)
                .Select(s => new TvChannel
                {
                    Id = s.Id.ToString(),
                    Title = s.Title,
                    IconUrl = s.SmallLogo,
                    Description = s.Description
                })
                .ToArray();

            return result;
        }

        /// <summary>
        /// Возвращает тв-пакеты
        /// </summary>
        /// <param name="source">Продукт</param>
        /// <param name="types">Типы пакетов</param>
        /// <returns></returns>
        public virtual TvPackage[] GetPackets(
            InacProductBaseDto source,
            MarketingTvPacketDto.TvPacketType[] types)
        {
            var result = source?.LinkedProducts?
                .OfType<TvPacketDto>()
                .Where(x => types?.Any(a => a == x.MarketingProduct?.PacketType) ?? false)
                .Select(s =>
                {
                    var fee = s.ProductParams?
                        .FirstOrDefault(x => x.BaseParamAlias == DpcBaseParameterType.SubscriptionFee.ToString("G"));
                    return new TvPackage
                    {
                        PacketType = s.MarketingProduct?.PacketType.ToString("G"),
                        ProductType = Product.None.GetDescription(),
                        Alias = s.MarketingProduct?.Alias,
                        Title = s.MarketingProduct?.Title,

                        Fee = Convert.ToDouble(fee?.NumberValue),
                        TextFeeUnit = fee?.Units,
                        // Не описано в тз
                        // Price = s.Price,
                        Description = s.MarketingProduct?.InacShortDescription,
                        Id = s.Id.ToString(),
                        SortOrder = s.SortOrder ?? 0,
                        Channels = s.MarketingProduct?.Channels?
                             .OrderBy(x => x.SortOrder ?? 0)
                             .Select(x => new TvChannel
                             {
                                 Id = x.Id.ToString(),
                                 Title = x.Title,
                                 IconUrl = x.SmallLogo,
                                 Description = x.Description
                             })
                             .ToArray(),
                        // todo: не описано в тз
                        // IsRequired = s.IsRequired.GetValueOrDefault(false),
                        // PromoFee = s.PromoFee,
                        // Promo = s.Promo
                    };
                })
                .OrderBy(x => x.SortOrder)
                .ThenBy(x => x.Id)
                .ToArray();

            return result;
        }
    }
}