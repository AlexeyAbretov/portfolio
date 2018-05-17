using Vendor.Core.Logger;
using Vendor.Client.WebApp.App_Core;
using Vendor.Client.WebApp.Controllers.Home;
using Vendor.Client.WebApp.Controllers.HomeRequest;
using Vendor.Client.WebApp.Controllers.Pages;
using Vendor.Client.WebApp.Models.HomeBillBasket;
using Vendor.Client.WebApp.Models.HomeBillBasket.Utils;
using Vendor.Infrastructure.Client.Sso;
using Vendor.Infrastructure.Client.Utils;
using Vendor.Interface.Data.Dictionary;
using Vendor.Interface.Settings;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Linq;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Api.Converters
{
    /// <summary>
    /// Базовый конвертер данных
    /// </summary>
    public class HomeConverterBase
    {
        /// <summary>
        /// Логгер
        /// </summary>
        protected readonly ILogger _logger = null;

        /// <summary>
        /// Конструктор
        /// </summary>
        /// <param name="logger"></param>
        public HomeConverterBase(ILogger logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Возвращает префикс услуги
        /// </summary>
        /// <returns></returns>
        protected virtual string GetServicePrefix()
        {
            var prefix = SiteTextUtils.GetSiteText(
               TextTitles.HOME_TARIFF_SERVICE_PREFIX_NAME);

            return prefix;
        }

        /// <summary>
        /// Возвращает модель тарифов по умолчанию
        /// </summary>
        /// <returns>Возвращает модель с заполнеными общими полями</returns>
        protected virtual HomeTariffApiListViewModel GetDefaultTariffsViewModel()
        {
            var result = new HomeTariffApiListViewModel
            {
                IsAuthenticated = SsoHelper.IsAuthorized,
                SupportLineText = SiteTextUtils.GetSiteText(TextTitles.TECHNICAL_SUPPORT_LINE_TEXT),

                ToConnectButtonTitle = SiteTextUtils.GetSiteText(TextTitles.NEW_SHPD_CATALOG_BUTTON_NAME),
                FeeTypeText = SiteTextUtils.GetSiteText(TextTitles.NEW_SHPD_CATALOG_FEE_TEXT),
                NoTvDescriptionTitle = SiteTextUtils.GetSiteText(TextTitles.NEW_SHPD_CATALOG_WITHOUT_TV_TEXT),
                NoTvDescriptionText = SiteTextUtils.GetSiteText(TextTitles.NEW_SHPD_CATALOG_WITHOUT_TV_HELP),

                NoWifiRouterDescriptionTitle = SiteTextUtils.GetSiteText(TextTitles.NEW_SHPD_CATALOG_WITHOUT_ROUTER_TEXT),
                NoWifiRouterDescriptionText = SiteTextUtils.GetSiteText(TextTitles.NEW_SHPD_CATALOG_WITHOUT_ROUTER_HELP),
                PriceTypeText = SiteTextUtils.GetSiteText(TextTitles.NEW_SHPD_CATALOG_PRICE_TEXT),
                IsSucceeded = true,
                RequestUrl = GetRequestUrl(null)
            };

            return result;
        }

        /// <summary>
        /// Возвращает дефолтовую модель тв тарифа
        /// </summary>
        /// <returns></returns>
        protected virtual HomeTvTariffViewModel GetDefaultTvTariffViewModel()
        {
            var result = new HomeTvTariffViewModel
            {
                TotalText = SiteTextUtils.GetSiteText(TextTitles.NEW_SHPD_CATALOG_IN_TOTAL_TEXT),
                SupportServiceDescription = SiteTextUtils.GetSiteText(
                    TextTitles.TECHNICAL_SUPPORT_LINE_BIG_TEXT_TV_CARD),

                ContainsInTariffText = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_CONTAINS_IN_TARIFF_TEXT),
                NotContainsInTariffText = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_NOT_CONTAINS_IN_TARIFF_TEXT),

                ContainsConsolesInTariffText = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_CONTAINS_IN_TARIFF_TEXT_FOR_CONSOLES),
                NotContainsConsolesInTariffText = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_NOT_CONTAINS_IN_TARIFF_TEXT_FOR_CONSOLES),

                AdditionalInfoAboutTariffText = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_ADDITIONAL_INFO_ABOUT_TARIFF_TEXT),
                SupportLineText = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_SUPPORT_LINE_TEXT),

                TvPackagesTitle = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_TV_PACKAGES_TITLE),
                TvPackagesBenefitText = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_TV_PACKAGES_BENEFIT_TEXT),
                TvPackagesWaitText = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_TV_PACKAGES_WAIT_PACKAGE_SELECTION_TEXT),
                TvSelectedServiceText = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_TV_SELECTED_SERVICE_TEXT),
                ServiceWaitEquipmentText = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_SERVICE_WAIT_EQUIPMENT_TEXT),
                AdditionalTvPackagesTitle = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_ADDITIONAL_TV_PACKAGES_TITLE),
                ServiceListTitle = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_SERVICE_LIST_TITLE),

                MultiroomRequestText = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_MULTIROOM_TURNING_ON_REQUEST_TEXT),
                TvRequestText = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_TV_TURNING_ON_REQUEST_TEXT),

                MultiroomWrongCountWarning = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_MULTIROOM_WRONG_COUNT_WARNING),

                MoreChannelsCountWordForm = GrammarUtil.GetWordForm(
                    WordFormKeys.MoreChannelsCount),
                TvBaseChannelsCountWordForm = GrammarUtil.GetWordForm(
                    WordFormKeys.TvBaseChannelsCount),
                TvChannelsCountWordForm = GrammarUtil.GetWordForm(
                    WordFormKeys.CollectableTvChannelsCount),
                AddedPackagesWordForm = GrammarUtil.GetWordForm(
                    WordFormKeys.YouAddedPackages),
                PackagesWordForm = GrammarUtil.GetWordForm(
                    WordFormKeys.PackageText),

                TvConsoleDescription = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_TV_CONSOLE_STATIC_TEXT),
                MultiroomTvCountNote = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_MULTIROOM_TV_COUNT_NOTE),
                ForRentText = SiteTextUtils.GetSiteText(
                    TextTitles.FOR_RENT_TEXT),

                VisiblePackagesCount = AppConfiguration.LoadIntSetting(
                    SettingTitles.NEW_SHPD_CATALOG_ADDITIONAL_PACKAGES_COUNT, 3),

                AddedConsoleWordForm = GrammarUtil.GetWordForm(
                    WordFormKeys.AddedConsoleText),

                ServicePrefix = PrefixUtil.GetPrefix(
                    TariffType.Service, true),

                FeeTypeText = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_FEE_TEXT_FOR_CARD),

                TextPriceUnit = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_RUB_TEXT),

                TvConsoleTitle = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_TV_CONSOLE_NAME_FOR_CARD),

                AdditionalPackagesBlockImage = AppConfiguration.LoadStringSetting(
                    SettingTitles.NEW_SHPD_CATALOG_TV_ADDITIONAL_PACKAGES_BLOCK_IMAGE_URL,
                    string.Empty),
            };

            return result;
        }

        /// <summary>
        /// Создает вью-модель инет-тарифа, предзаполняет ее данными из справочников QP.
        /// Т.к. бандл наследуется от инет-тарифа, для него также вызывается этот метод
        /// </summary>
        /// <returns></returns>
        protected virtual HomeInternetTariffViewModel GetPreInitInternetTariff()
        {
            if (!int.TryParse(ClientUtils.GetQpSettings(
                SettingTitles.NEW_SHPD_CATALOG_CARD_PARAMETERS_GROUP),
                out int cardParamGroupId))
            {
                _logger.LogError(() => "В QP не задана настройка NEW_SHPD_CATALOG_CARD_PARAMETERS_GROUP");
            }

            if (!int.TryParse(ClientUtils.GetQpSettings(
                SettingTitles.NEW_SHPD_CATALOG_CARD_PARAMETERS_SERVICES_GROUP),
                out int cardParamServicesGroupId))
            {
                _logger.LogError(() => "В QP не задана настройка NEW_SHPD_CATALOG_CARD_PARAMETERS_SERVICES_GROUP");
            }

            if (!int.TryParse(ClientUtils.GetQpSettings(
                SettingTitles.SHPD_NEW_CATALOG_INSTALLMENT_TEXTS_GROUP_PARAMETERS),
                out int routerInstallmentTextsGroupId))
            {
                _logger.LogError(() => "В QP не задана настройка SHPD_NEW_CATALOG_INSTALLMENT_TEXTS_GROUP_PARAMETERS");
            }

            if (!int.TryParse(ClientUtils.GetQpSettings(
                SettingTitles.SHPD_NEW_CATALOG_INSTALLMENT_PRICES_GROUP_PARAMETERS),
                out int routerInstallmentPricesGroupId))
            {
                _logger.LogError(() => "В QP не задана настройка SHPD_NEW_CATALOG_INSTALLMENT_PRICES_GROUP_PARAMETERS");
            }

            if (!int.TryParse(ClientUtils.GetQpSettings(
                SettingTitles.SHPD_NEW_CATALOG_INSTALLMENT_INSTALLMENTS_GROUP_PARAMETERS),
                out int routerInstallmentInstallmentsGroupId))
            {
                _logger.LogError(() => "В QP не задана настройка SHPD_NEW_CATALOG_INSTALLMENT_INSTALLMENTS_GROUP_PARAMETERS");
            }

            if (!int.TryParse(ClientUtils.GetQpSettings(
                SettingTitles.NEW_SHPD_CATALOG_EQUIPMENT_TECHNICAL_FEATURES_GROUP_PARAMETER_ID),
                out int routerTechnicalFeaturesGroupId))
            {
                _logger.LogError(() => "В QP не задана настройка NEW_SHPD_CATALOG_EQUIPMENT_TECHNICAL_FEATURES_GROUP_PARAMETER_ID");
            }

            var paramsUnderLegals = ClientUtils.GetQpSettings(SettingTitles.NEW_SHPD_CATALOG_PARAMETERS_GROUPS_UNDER_LEGALS);

            var textTitleUnderParamsForInetCard = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_TITLE_UNDER_PARAMETERS_FOR_INTERNET_CARD);
            var textUnderParamsForInetCard = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_TEXT_UNDER_PARAMETERS_FOR_INTERNET_CARD);

            var result = new HomeInternetTariffViewModel
            {
                TotalText = SiteTextUtils.GetSiteText(TextTitles.NEW_SHPD_CATALOG_IN_TOTAL_TEXT),
                SupportLineText = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_SUPPORT_LINE_TEXT),
                AdditionalInfoAboutTariffText = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_ADDITIONAL_INFO_ABOUT_TARIFF_TEXT),
                SelectedServiceText = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_TV_SELECTED_SERVICE_TEXT),

                TextIncluded = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_CONTAINS_IN_TARIFF_TEXT),
                TextNotIncluded = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_NOT_CONTAINS_IN_TARIFF_TEXT),
                TextAdded = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_ADDED_IN_TARIFF_TEXT),
                TextIncludedBy = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_CONTAINS_IN_TARIFF_TEXT_WITH_COST),
                TextIncludedRouter = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_CONTAINS_IN_TARIFF_TEXT_FOR_ROUTERS),
                TextIncludedByRouter = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_CONTAINS_IN_TARIFF_TEXT_WITH_COST_FOR_ROUTERS),

                TextRouterTechInfoLink = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_ROUTER_TECHNICAL_INFORMATION_LINK_TEXT),
                TextRouterMoreInfo = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_ROUTER_MORE_INFO_TEXT),
                TextPopupButtonAddToOrder = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_POPUP_BUTTON_TEXT),
                TextPopupButtonRemoveFromOrder = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_POPUP_BUTTON_REMOVE_TEXT),
                TextFeeUnit = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_FEE_TEXT_FOR_CARD),
                TextPriceUnit = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_RUB_TEXT),

                TextVsuSpeedUp = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_VSU_UPSPEED_TEXT),
                TextVsuSpeedCurrent = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_VSU_CURRENT_TEXT),
                TextVsuPriceTitle = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_VSU_PRICE_TEXT),

                TextInetSpeedDescription = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_INTERNET_SPEED_DESCRIPTION),

                TextLegalTitleUnderParamsForInetCard = !string.IsNullOrEmpty(textTitleUnderParamsForInetCard)
                    && !string.IsNullOrEmpty(textUnderParamsForInetCard) ? textTitleUnderParamsForInetCard : "",
                TextLegalUnderParamsForInetCard = !string.IsNullOrEmpty(textTitleUnderParamsForInetCard)
                    && !string.IsNullOrEmpty(textUnderParamsForInetCard) ? textUnderParamsForInetCard : "",

                CardParamGroupId = cardParamGroupId,
                CardParamServiceGroupId = cardParamServicesGroupId,
                ParamsUnderLegalsGroupIds = !string.IsNullOrEmpty(paramsUnderLegals) ?
                    paramsUnderLegals
                        .Split(',')
                        .Select(x => x
                            .Trim())
                            .ToArray() :
                    new string[0],

                IsRouterLegalOnPopup = ClientUtils.GetQpSettings(SettingTitles.NEW_SHPD_CATALOG_ROUTER_DESCRIPTION_OR_LEGAL) == "1",
                RouterInstallmentTextsGroupId = routerInstallmentTextsGroupId,
                RouterInstallmentPricesGroupId = routerInstallmentPricesGroupId,
                RouterInstallmentInstallmentsGroupId = routerInstallmentInstallmentsGroupId,
                RouterTechnicalFeaturesGroupId = routerTechnicalFeaturesGroupId,
                EquipmentUrl = (new UrlHelper(HttpContext.Current.Request.RequestContext))
                    .Action(
                        EquipmentPageController.ActionNameConstants.Details,
                        EquipmentPageController.NameConst,
                        new RouteValueDictionary()
                        {
                            {"ui-item", SitemapHelper.HomeEquipmentPage}
                        }),
                IsLegalOnInetSpeedPopup = ClientUtils.GetQpSettings(SettingTitles.NEW_SHPD_CATALOG_VSU_TEXT_OR_LEGAL) == "1",
                ServicePrefix = PrefixUtil.GetPrefix(TariffType.Service, true),
            };

            return result;
        }

        /// <summary>
        /// Возвращает модель Бандла по умолчанию
        /// </summary>
        /// <returns></returns>
        protected virtual HomeKitTariffViewModel GetPreInitKitModel()
        {
            if (!int.TryParse(ClientUtils.GetQpSettings(
                SettingTitles.NEW_SHPD_CATALOG_CARD_PARAMETERS_GROUP),
                out int cardParamGroupId))
            {
                _logger
                     .LogError(() => "В QP не задана настройка NEW_SHPD_CATALOG_CARD_PARAMETERS_GROUP");
            }

            if (!int.TryParse(ClientUtils.GetQpSettings(
                SettingTitles.NEW_SHPD_CATALOG_CARD_PARAMETERS_SERVICES_GROUP),
                out int cardParamServicesGroupId))
            {
                _logger
                    .LogError(() => "В QP не задана настройка NEW_SHPD_CATALOG_CARD_PARAMETERS_SERVICES_GROUP");
            }

            if (!int.TryParse(ClientUtils.GetQpSettings(
                SettingTitles.SHPD_NEW_CATALOG_INSTALLMENT_TEXTS_GROUP_PARAMETERS),
                out int routerInstallmentTextsGroupId))
            {
                _logger
                    .LogError(() => "В QP не задана настройка SHPD_NEW_CATALOG_INSTALLMENT_TEXTS_GROUP_PARAMETERS");
            }

            if (!int.TryParse(ClientUtils.GetQpSettings(
                SettingTitles.SHPD_NEW_CATALOG_INSTALLMENT_PRICES_GROUP_PARAMETERS),
                out int routerInstallmentPricesGroupId))
            {
                _logger
                    .LogError(() => "В QP не задана настройка SHPD_NEW_CATALOG_INSTALLMENT_PRICES_GROUP_PARAMETERS");
            }

            if (!int.TryParse(ClientUtils.GetQpSettings(
                SettingTitles.SHPD_NEW_CATALOG_INSTALLMENT_INSTALLMENTS_GROUP_PARAMETERS),
                out int routerInstallmentInstallmentsGroupId))
            {
                _logger
                    .LogError(() => "В QP не задана настройка SHPD_NEW_CATALOG_INSTALLMENT_INSTALLMENTS_GROUP_PARAMETERS");
            }

            if (!int.TryParse(ClientUtils.GetQpSettings(
                SettingTitles.NEW_SHPD_CATALOG_EQUIPMENT_TECHNICAL_FEATURES_GROUP_PARAMETER_ID),
                out int routerTechnicalFeaturesGroupId))
            {
                _logger
                    .LogError(() => "В QP не задана настройка NEW_SHPD_CATALOG_EQUIPMENT_TECHNICAL_FEATURES_GROUP_PARAMETER_ID");
            }

            var paramsUnderLegals = ClientUtils.GetQpSettings(
                SettingTitles.NEW_SHPD_CATALOG_PARAMETERS_GROUPS_UNDER_LEGALS);

            var textTitleUnderParamsForInetCard = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_TITLE_UNDER_PARAMETERS_FOR_INTERNET_AND_TV_CARD);
            var textUnderParamsForInetCard = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_TEXT_UNDER_PARAMETERS_FOR_INTERNET_AND_TV_CARD);

            var result = new HomeKitTariffViewModel
            {
                TotalText = SiteTextUtils.GetSiteText(TextTitles.NEW_SHPD_CATALOG_IN_TOTAL_TEXT),
                SupportLineText = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_SUPPORT_LINE_TEXT),
                AdditionalInfoAboutTariffText = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_ADDITIONAL_INFO_ABOUT_TARIFF_TEXT),

                SelectedServiceText = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_TV_SELECTED_SERVICE_TEXT),

                TextIncluded = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_CONTAINS_IN_TARIFF_TEXT),
                TextNotIncluded = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_NOT_CONTAINS_IN_TARIFF_TEXT),
                TextAdded = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_ADDED_IN_TARIFF_TEXT),
                TextIncludedBy = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_CONTAINS_IN_TARIFF_TEXT_WITH_COST),
                TextIncludedRouter = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_CONTAINS_IN_TARIFF_TEXT_FOR_ROUTERS),
                TextIncludedByRouter = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_CONTAINS_IN_TARIFF_TEXT_WITH_COST_FOR_ROUTERS),

                ServiceWaitEquipmentText = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_SERVICE_WAIT_EQUIPMENT_TEXT),

                TextRouterTechInfoLink = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_ROUTER_TECHNICAL_INFORMATION_LINK_TEXT),
                TextRouterMoreInfo = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_ROUTER_MORE_INFO_TEXT),
                TextPopupButtonAddToOrder = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_POPUP_BUTTON_TEXT),
                TextPopupButtonRemoveFromOrder = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_POPUP_BUTTON_REMOVE_TEXT),
                TextFeeUnit = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_FEE_TEXT_FOR_CARD),
                TextPriceUnit = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_RUB_TEXT),

                TextVsuSpeedUp = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_VSU_UPSPEED_TEXT),
                TextVsuSpeedCurrent = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_VSU_CURRENT_TEXT),
                TextVsuPriceTitle = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_VSU_PRICE_TEXT),

                TextInetSpeedDescription = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_INTERNET_SPEED_DESCRIPTION),

                SelectedRouterPrefix =
                    SiteTextUtils.GetSiteText(
                        TextTitles.NEW_SHPD_CATALOG_SELECTED_ROUTER_TEXT),

                TextLegalTitleUnderParamsForInetCard = !string.IsNullOrEmpty(textTitleUnderParamsForInetCard) &&
                    !string.IsNullOrEmpty(textUnderParamsForInetCard) ?
                        textTitleUnderParamsForInetCard :
                        string.Empty,
                TextLegalUnderParamsForInetCard = !string.IsNullOrEmpty(textTitleUnderParamsForInetCard) &&
                    !string.IsNullOrEmpty(textUnderParamsForInetCard) ?
                        textUnderParamsForInetCard :
                        string.Empty,

                CardParamGroupId = cardParamGroupId,
                CardParamServiceGroupId = cardParamServicesGroupId,
                ParamsUnderLegalsGroupIds = !string.IsNullOrEmpty(paramsUnderLegals) ?
                    paramsUnderLegals
                        .Split(',')
                        .Select(x => x.Trim())
                        .ToArray() :
                    new string[0],

                IsRouterLegalOnPopup = ClientUtils.GetQpSettings(
                    SettingTitles.NEW_SHPD_CATALOG_ROUTER_DESCRIPTION_OR_LEGAL) == "1",

                RouterInstallmentTextsGroupId = routerInstallmentTextsGroupId,
                RouterInstallmentPricesGroupId = routerInstallmentPricesGroupId,
                RouterInstallmentInstallmentsGroupId = routerInstallmentInstallmentsGroupId,
                RouterTechnicalFeaturesGroupId = routerTechnicalFeaturesGroupId,
                EquipmentUrl = (new UrlHelper(HttpContext.Current.Request.RequestContext))
                    .Action(EquipmentPageController.ActionNameConstants.Details, EquipmentPageController.NameConst, new RouteValueDictionary()
                    {
                        {"ui-item", SitemapHelper.HomeEquipmentPage}
                    }),
                IsLegalOnInetSpeedPopup = ClientUtils.GetQpSettings(SettingTitles.NEW_SHPD_CATALOG_VSU_TEXT_OR_LEGAL) == "1",

                ServicePrefix = PrefixUtil.GetPrefix(TariffType.Service, true),

                AdditionalPackagesBlockImage = AppConfiguration.LoadStringSetting(
                    SettingTitles.NEW_SHPD_CATALOG_BUNDLE_TV_ADDITIONAL_PACKAGES_BLOCK_IMAGE_URL, string.Empty),
            };

            return result;
        }

        /// <summary>
        /// Формирование строки выбора скорости по шаблону
        /// </summary>
        /// <param name="text">Текст</param>
        /// <param name="vsu">Выбор скорости</param>
        /// <returns></returns>
        protected virtual string SpeedChooserReplaces(
            TextTitles text,
            SpeedGroupViewModel vsu)
        {
            var t = SiteTextUtils.GetSiteText(text);
            if (string.IsNullOrEmpty(t))
                return t;
            return t
                .Replace("{MinSpeed}", vsu.MinVsuSpeed().ToString())
                .Replace("{MaxSpeed}", vsu.MaxVsuSpeed().ToString())
                .Replace("{MinFee}", vsu.MinVsuFee().ToString())
                .Replace("{MaxFee}", vsu.MaxVsuFee().ToString());
        }

        /// <summary>
        /// Возвращает ссылку на заявку подключения тарифа
        /// </summary>
        /// <param name="id">Ид. тарифа</param>
        /// <returns></returns>
        public static string GetRequestUrl(string id)
        {
            var url = new UrlHelper(HttpContext.Current.Request.RequestContext);

            return url.Action(HomeRequestPageController.ActionNameConstants.Index,
                HomeRequestPageController.NameConst,
                new RouteValueDictionary()
                {
                    { "ui-item", SitemapHelper.HomeRequestPage },
                    { "id", id }
                });
        }

        /// <summary>
        /// Возвращает ссылку на тариф
        /// </summary>
        /// <param name="action">Действие</param>
        /// <param name="alias">Алиас тарифа</param>
        /// <returns></returns>
        public static string GetUrl(string action, string alias)
        {
            var url = new UrlHelper(HttpContext.Current.Request.RequestContext);

            return url.Action(action,
                HomeCatalogPageController.NameConst,
                new RouteValueDictionary()
                {
                    { "ui-item", SitemapHelper.BaseNewHomeCatalogPage},
                    { "id", alias }
                });
        }
    }
}