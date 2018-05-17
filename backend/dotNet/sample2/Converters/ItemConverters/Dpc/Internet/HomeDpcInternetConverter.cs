using Vendor.Client.WebApp.Controllers.Home;
using Vendor.Client.WebApp.Models.MobileTariffs.TariffParameters;
using Vendor.Core.Enums;
using Vendor.Interface.Data.Convergence;
using Vendor.Interface.Data.Dictionary;
using Vendor.Interface.Data.HomeTariffs;
using Vendor.Interface.Settings;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Api.Converters.ItemConverters.Dpc
{
    /// <summary>
    /// Класс преобразования тарифа интернет из DPC
    /// </summary>
    public class HomeDpcInternetConverter : HomeDpcItemConverterBase
    {
        /// <summary>
        /// Список стратегий для получения скоростных параметров
        /// </summary>
        protected readonly List<HomeDpcInternetSpeedStrategyBase> _speedStrategyList;

        public HomeDpcInternetConverter()
        {
            _speedStrategyList = new List<HomeDpcInternetSpeedStrategyBase>
            {
                new HomeDpcInternetUnlimetedSpeedStrategy(),
                new HomeDpcInternetNightSpeedStrategy(),
                new HomeDpcInternetMultiSpeedStrategy(),
                new HomeDpcInternetReduceSpeedStrategy(),
                new HomeDpcInternetLimitedSpeedStrategy()
            };
        }

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
                HomeCatalogPageController.ActionNameConstants.Internet,
                result.Alias);

            result.ProductType = Product.Internet.GetDescription();

            return result;
        }

        /// <summary>
        /// Возвращает АП интернет-тарифа
        /// </summary>
        /// <param name="source">Продукт</param>
        /// <returns></returns>
        protected override (double, string) GetFee(InacProductBaseDto source)
        {
            var fee = source.ProductParams?
                .FirstOrDefault(
                    a => a.BaseParamAlias == DpcBaseParameterType.SubscriptionFee.ToString("G"));

            return (Convert.ToDouble(fee?.NumberValue), fee?.Units);
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
            base.ConvertItem(source, model);

            var result = (HomeInternetTariffViewModel)model;
            result.IsNotFixTariffCategory = model.IsConnectionCheckable;

            result.SelectedRouterPrefix =
                SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_SELECTED_ROUTER_TEXT);

            result.ConnectButtonTitle = SiteTextUtils.GetSiteText(result.IsNotFixTariffCategory ?
                TextTitles.NEW_SHPD_CATALOG_CARD_CONNECT_BUTTON_TEXT :
                TextTitles.NEW_SHPD_CATALOG_CARD_CONNECT_BUTTON_TEXT_FOR_INTERNET_LITE);
            result.ConnectButtonUrl =
                ClientUtils.GetQpSettings(result.IsNotFixTariffCategory ?
                SettingTitles.NEW_SHPD_CATALOG_CARD_CONNECT_BUTTON_LINK :
                SettingTitles.NEW_SHPD_CATALOG_CARD_CONNECT_BUTTON_LINK_FOR_INTERNET_LITE);

            // todo: Уточняют тз
            result.InternetServices = ConvertInternetServices(source);
            result.InternetParamsGroups = ConvertAdditionalParams(
                source,
                result.CardParamGroupId);

            result.InternetParamsGroups = (result.InternetParamsGroups ?? new List<ParamGroupApiViewModel>())
                .Union(ConvertSpeedParams(
                    source,
                    result.CardParamGroupId) ?? new List<ParamGroupApiViewModel>())
                .ToList();
        }

        /// <summary>
        /// Преобразует сервисы тарифа
        /// </summary>
        /// <param name="source">Тариф</param>
        /// <returns></returns>
        protected virtual ServiceApiViewModel[] ConvertInternetServices(
            InacProductBaseDto source)
        {
            return source?.LinkedProducts?
                .OfType<FTTBServiceDto>()
                .Select(s => new ServiceApiViewModel
                {
                    Type = ServiceType.WifiRouter.GetDescription(),
                    Title = s.MarketingProduct?.Title,
                    Alias = s.MarketingProduct?.Alias,
                    // todo: units from Dpc?
                    Fee = GetFee(s).Item1,
                    Equipments = new[]
                    {
                        new EquipmentApiViewModel
                        {
                            Price = 0,
                            MarketingTitle = s.MarketingProduct?.Alias,
                        }
                    }
                })
                .ToArray();
        }

        /// <summary>
        /// Преобразует доп. параметры тарифа
        /// </summary>
        /// <param name="source">Тариф</param>
        /// <param name="groupId">Группа параметров</param>
        /// <returns></returns>
        protected virtual List<ParamGroupApiViewModel> ConvertAdditionalParams(
            InacProductBaseDto source,
            int groupId = 0)
        {
            var group = new ParamGroupApiViewModel
            {
                Id = groupId
            };

            group.Parameters = source.ProductParams
                // выбираем главные для карточки
                .Where(x => x.MainInCard)
                .Select(x => new ParamApiViewModel
                {
                    Id = x.Id,
                    Text = x.Title,
                    Value = $"{x.FormattedValue} {x.Units}",
                    GroupId = groupId,
                    IsMain = true,
                    // по тз данные парметры внизу списка. Если ничего не указали, то макс. ордер.
                    SortOrder = x.SortOrder ?? int.MaxValue
                })
                .ToList();

            return new List<ParamGroupApiViewModel>
            {
                group
            };
        }

        /// <summary>
        /// Преоброазует параметры скорости
        /// </summary>
        /// <param name="source">Тариф</param>
        /// <param name="groupId">Группа параметров</param>
        /// <returns></returns>
        protected virtual List<ParamGroupApiViewModel> ConvertSpeedParams(
            InacProductBaseDto source,
            int groupId = 0)
        {
            var inet = source as InternetTariffDto;

            if (inet == null || inet.HideSpeedParams)
            {
                return null;
            }

            var group = new ParamGroupApiViewModel
            {
                Id = groupId
            };

            var strategy = _speedStrategyList
                .FirstOrDefault(x => x.CanUse(inet));

            group.Parameters = strategy?.GetParameters(inet);

            return new List<ParamGroupApiViewModel>
            {
                group
            };
        }
    }
}