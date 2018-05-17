using Vendor.Client.WebApp.Models.MobileTariffs.TariffParameters;
using Vendor.Core.Enums;
using Vendor.Interface.Data.Convergence;
using Vendor.Interface.Data.Dictionary;
using Vendor.Interface.Data.DPC;
using Vendor.Interface.Data.HomeTariffs;
using Vendor.Interface.Data.Mobile;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Api.Converters.ItemConverters.Dpc
{
    /// <summary>
    /// Базовый класс преобразования продуктов из DPC
    /// </summary>
    public class HomeDpcItemConverterBase
    {
        /// <summary>
        /// Преобразует элемент списка продуктов
        /// </summary>
        /// <param name="source">Продукт</param>
        /// <returns></returns>
        public virtual HomeTariffApiItemViewModel ConvertListItem(
            InacProductBaseDto source)
        {
            var alias = source.MarketingProduct?.Alias;
            var (fee, units) = GetFee(source);

            var result = new HomeTariffApiItemViewModel
            {
                Id = source.MarketingProduct?.Id.ToString(),
                Alias = alias,
                Title = source.MarketingProduct?.Title,
                RequestUrl = HomeConverterBase.GetRequestUrl(alias),
                IsSucceeded = true,
                // todo: не описано в ТЗ
                PromoBenefit = string.Empty,
                Benefit = source.MarketingProduct?.Benefit,
                IsConnectionCheckable = source.MarketingProduct?.Categories?
                    .Any(a => a.CheckConnectionAvailable) ?? false,
                IsArchive = source.InacStatus?.Code == VisibilityEnum.O ||
                    source.InacStatus?.Code == VisibilityEnum.OI,
                SortOrder = source.SortOrder ?? 0,

                Fee = fee,
                TextFeeUnit = units
            };

            result.Params = ConvertParams(source.ProductParams);

            result.TariffServices = ConvertServices(
                source.LinkedProducts
                    .Where(x => x is FTTBServiceDto)
                    .Cast<FTTBServiceDto>()
                    .ToArray());

            return result;
        }

        /// <summary>
        /// Преобразует продукт в модель для отображения
        /// </summary>
        /// <param name="source">Продукт</param>
        /// <param name="model">Модель для отображения</param>
        public virtual void ConvertItem(
            InacProductBaseDto source,
            HomeItemCardViewModel model)
        {
            model.IsConnectionCheckable = source.MarketingProduct?.Categories?
                .Any(a => a.CheckConnectionAvailable) ?? false;

            var alias = source.MarketingProduct?.Alias;
            var (fee, units) = GetFee(source);

            model.Id = source.Id.ToString();
            model.Alias = alias;
            model.Fee = fee;
            model.TextFeeUnit = units;
            model.Title = source.MarketingProduct?.Title;

            model.IsArchive = source.InacStatus?.Code == VisibilityEnum.O ||
                source.InacStatus?.Code == VisibilityEnum.OI;
            model.ArchiveNote = SiteTextUtils.GetSiteText(
                TextTitles.NEW_SHPD_CATALOG_ARCHIVE_TEXT);

            model.Legals = ConvertLegals(source);
        }

        /// <summary>
        /// Формирует лигалы продукта
        /// </summary>
        /// <param name="source">Продукт</param>
        /// <returns></returns>
        protected virtual Legals ConvertLegals(
            InacProductBaseDto source)
        {
            var first = GetFirstLegalItem(source);

            var list = first == null ?
                new List<LegalItemViewModel>():
                new List<LegalItemViewModel>
                {
                    first
                };

            list.AddRange(ConvertParamsLegal(source.ProductParams));

            return new Legals
            {
                List = list
            };
        }

        /// <summary>
        /// Формирует первый элемент лигалов
        /// </summary>
        /// <param name="source">Продукт</param>
        /// <returns></returns>
        protected virtual LegalItemViewModel GetFirstLegalItem(
            InacProductBaseDto source)
        {
            if (!source.Modifiers
                .Any(a => a == ModifierAlias.HideFullDescription.GetDescription()))
            {
                return new LegalItemViewModel
                {
                    Title = Resources.HomeTariffs.FirstLegalItemTitle,
                    Text = new[]
                    {
                        source.InacFullDescription
                    },
                    Type = LegalType.Internet.GetDescription()
                };
            }

            return null;
        }

        /// <summary>
        /// Преобразует параметры в лигалы
        /// </summary>
        /// <param name="sources">Параметры</param>
        /// <returns></returns>
        protected virtual LegalItemViewModel[] ConvertParamsLegal(
            MobileTariffParamDto[] @params)
        {
            var legals = @params?
                .Where(x => x.Modifiers
                    .Any(a => a == ModifierAlias.NewShpdCatalogCardUnderLegals.GetDescription()) &&
                        x.MobileTariffParamGroup != null)
                .OrderBy(x => x.MobileTariffParamGroup?.SortOrder)
                .GroupBy(x => x.MobileTariffParamGroup?.Title)
                .Select(s => new LegalItemViewModel
                {
                    Title = s.Key,
                    Values = s
                        .OrderBy(x => x.SortOrder ?? 0)
                        .Select(x => new LegalViewModel
                        {
                            Title = x.Title,
                            Text = new[]
                            {
                                x.NumberValue != null ?
                                    $"{x.FormattedValue} {x.Units}" :
                                    x.TextValue
                            }
                        })
                        .ToArray(),
                    Type = LegalType.Param.GetDescription()
                })
                .ToArray();

            return legals;
        }

        /// <summary>
        /// Преобразует услуги
        /// </summary>
        /// <param name="services">Массив услуг</param>
        /// <returns></returns>
        protected virtual TariffService[] ConvertServices(
            FTTBServiceDto[] services)
        {
            return services?
                .Select(s => new TariffService
                {
                    Id = s.Id.ToString(),
                    Alias = s.MarketingProduct?.Alias,
                    Title = s.MarketingProduct?.Title,
                    ProductType = Product.Service.GetDescription(),
                    Type = DpcServiceTypeToServiceType(
                        s.MarketingProduct?.FttbServiceType?.Alias),
                    // todo: откуда брать
                    Prefix = string.Empty,
                    // todo: откуда брать
                    NewCatalogDescription = string.Empty
                })
                .ToArray();
        }

        /// <summary>
        /// Преобразует тип услуги DPC в тип услуги QP
        /// </summary>
        /// <param name="serviceType">Тип услуги DPC</param>
        /// <returns></returns>
        protected virtual string DpcServiceTypeToServiceType(
            string serviceType)
        {
            if (serviceType == FttbServiceType.WiFiRouter.ToString())
            {
                return ServiceType.WifiRouter.GetDescription();
            }

            return string.Empty;
        }

        /// <summary>
        /// Возвращает АП продукта
        /// </summary>
        /// <param name="source">Продукт</param>
        /// <returns></returns>
        protected virtual (double, string) GetFee(InacProductBaseDto source)
        {
            var fee = source.ProductParams?
                .FirstOrDefault(
                    a => a.BaseParamAlias == DpcBaseParameterType.MinPrice.ToString("G"));
            if (fee == null)
            {
                fee = source.ProductParams?
                    .FirstOrDefault(
                        a => a.BaseParamAlias == DpcBaseParameterType.SubscriptionFee.ToString("G"));
            }

            return (Convert.ToDouble(fee?.NumberValue), fee?.Units);
        }

        /// <summary>
        /// Преобразованеи списка параметров тарифа
        /// </summary>
        /// <param name="params">Параметры тарифа</param>
        /// <returns></returns>
        protected virtual List<HomeTariffParamViewModel> ConvertParams(
            MobileTariffParamDto[] @params)
        {
            HomeTariffParamViewModel ConvertInternetSpeedParam(
                MobileTariffParamDto source)
            {
                return new HomeTariffParamViewModel
                {
                    Id = source.Id,
                    // todo: до?
                    Value = source.NumberValue != null ?
                        ($"до {source.NumberValue} {source.Units}") :
                        source.TextValue,
                    // todo: интернет параметры для вывода определюятся по отрицательному SortOrder
                    // как это сделано для DPC?
                    SortOrder = int.MinValue,
                    Type = source.BaseParamAlias
                };
            }

            return @params?
                .Select(s => s.BaseParamAlias == DpcBaseParameterType.InternetSpeed.ToString("G") ?
                    ConvertInternetSpeedParam(s) :
                    new HomeTariffParamViewModel
                    {
                        Id = s.Id,
                        Value = s.NumberValue != null ?
                            ($"{s.NumberValue} {s.Units}") :
                            s.TextValue,
                        SortOrder = s.SortOrder ?? 0,
                        Type = s.BaseParamAlias
                    })
                .ToList();
        }
    }
}