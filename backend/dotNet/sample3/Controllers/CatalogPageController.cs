using Vendor.Client.Models.Enums.USSS;
using Vendor.Client.Models.Pages.Home;
using Vendor.Client.WebApp.App_Core;
using Vendor.Client.WebApp.LocalServices;
using Vendor.Core.Engine;
using Vendor.Core.Enums;
using Vendor.Infrastructure.Client.Mvc;
using Vendor.Infrastructure.Client.Mvc.ActionFilters;
using Vendor.Infrastructure.Client.Sso;
using Vendor.Infrastructure.Client.Utils;
using Vendor.Interface.Data.Dictionary;
using System;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Vendor.Client.WebApp.Controllers.Home
{
    /// <summary>
    /// Каталог inac/fttb пресетов домашнего Билайн
    /// </summary>
    [Controls(typeof(HomePresetsCatalogPage))]
    [RequireAuth(requireMobile: false, requireFttb: true, allowJsonResponse: true)]
    public partial class HomePresetsCatalogPageController : ContentControllerBase<HomePresetsCatalogPage>
    {
        private readonly IHomePresetService _service;

        public HomePresetsCatalogPageController(
            IHomePresetService service)
        {
            _service = service;
        }

        /// <summary>
        /// Главное представление
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [CheckRegionId]
        [OutputCache(CacheProfile = CacheProfiles.HomeTariffIndexPageProfile, VaryByParam = "none")]
        public new virtual async Task<ActionResult> Index()
        {
            var presetsTask = _service.GetPresets(SsoHelper.FttbLogin);
            var optionsTask = GetOptions();
            var servicesTask = _service.GetServices(SsoHelper.FttbLogin);
            var availableTask = _service.GetAvailableFttbPresets(SsoHelper.FttbLogin);

            await Task.WhenAll(
                presetsTask,
                optionsTask,
                servicesTask,
                availableTask);

            return View(
                HomeTariffPageController.Views.Presets.Index,
                new
                {
                    Presets = presetsTask.Result,
                    Options = optionsTask.Result,
                    Services = servicesTask.Result,
                    Mappings = new
                    {
                        Available = availableTask?.Result?
                            .Select(x => new
                            {
                                Id = x.ServiceId,
                                States = x.Containers
                                    .SelectMany(w => w.Services)
                                    .Select(w => new
                                    {
                                        Id = w.ServiceId,
                                        State = w.MappingRule
                                    })
                                    .ToArray()
                            })
                            .ToArray()
                    }
                });
        }

        /// <summary>
        /// Возвращает словоформу по ключу
        /// </summary>
        /// <param name="key">Ключ словоформы</param>
        /// <returns></returns>
        private object GetWordForm(WordFormKeys key)
        {
            var (rusFirstPlural, rusSecondPlural, rusThirdPlural) = GrammarUtil.GetWordForm(
                key);

            return new
            {
                rusFirstPlural,
                rusSecondPlural,
                rusThirdPlural
            };
        }

        /// <summary>
        /// Возвращает настройки для каталога
        /// </summary>
        /// <returns></returns>
        private async Task<object> GetOptions()
        {
            var result = new
            {
                Title = SiteTextUtils.GetSiteText(
                    TextTitles.INAC_PRESET_CATALOG_NAME),
                InfoText = SiteTextUtils.GetSiteText(
                    TextTitles.INAC_PRESET_CATALOG_BENEFIT),
                BundleNote = SiteTextUtils.GetSiteText(
                    TextTitles.INAC_PRESET_CATALOG_BANNER_ABOVE_FOR_BUNDLE),
                Note = SiteTextUtils.GetSiteText(
                    TextTitles.INAC_PRESET_CATALOG_BANNER_ABOVE),
                Groups = PrepareGroups(),
                RubSymbol = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_RUB_TEXT),
                MbitsPerSecond = SiteTextUtils.GetSiteText(
                    TextTitles.HOME_TARIFF_INET_MBPS_SPEED_TITLE),
                RubPerMonth = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_FEE_TEXT),
                SaveChangesText = SiteTextUtils.GetSiteText(
                    TextTitles.INAC_PRESET_CATALOG_SAVE_CHANGES_TEXT),
                CourierServiceText = SiteTextUtils.GetSiteText(
                    TextTitles.INAC_PRESET_CATALOG_TV_CONSOLE_COURIER_CALL_TEXT),

                TvChannelsWordForms = GetWordForm(WordFormKeys.TvChannelsCount),
                TvConsoleWordForms = GetWordForm(WordFormKeys.ConsoleText),
                TvConsoleNoteTitle = SiteTextUtils.GetSiteText(
                    TextTitles.INAC_PRESET_CATALOG_TV_CONSOLE_NOTE_TITLE),
                TvConsoleNote = SiteTextUtils.GetSiteText(
                    TextTitles.INAC_PRESET_CATALOG_TV_CONSOLE_NOTE),
                TvConsoleTitle = SiteTextUtils.GetSiteText(
                    TextTitles.INAC_PRESET_CATALOG_TV_CONSOLE_NAME),

                FeePeriod = SiteTextUtils.GetSiteText(
                    TextTitles.INAC_PRESET_CATALOG_MONTH_TEXT),
                TvGiftIcon = SiteTextUtils.GetSiteText(
                    TextTitles.INAC_PRESET_CATALOG_GIFT),
                AdditionalServicesText = SiteTextUtils.GetSiteText(
                    TextTitles.INAC_PRESET_CATALOG_ADDITIONAL_SERVICES_TEXT),
                OrderTariffText = SiteTextUtils.GetSiteText(
                    TextTitles.INAC_PRESET_CATALOG_TO_ORDER_BUTTON_TEXT),
                ConnectTariffText = SiteTextUtils.GetSiteText(
                    TextTitles.INAC_PRESET_CATALOG_CONNECT_BUTTON_TEXT),
                SetupTariffText = SiteTextUtils.GetSiteText(
                    TextTitles.INAC_PRESET_CATALOG_SET_TARIFF_TEXT),
                MoreInfoText = SiteTextUtils.GetSiteText(
                    TextTitles.INAC_PRESET_CATALOG_DETAILS_TEXT),
                YourTariffText = SiteTextUtils.GetSiteText(
                    TextTitles.INAC_PRESET_CATALOG_YOUR_TARIFF_TEXT),

                WifiRentTitle = SiteTextUtils.GetSiteText(
                    TextTitles.INAC_PRESET_CATALOG_WIFI_ROUTER_NAME),
                WifiRouterPopupTitle = SiteTextUtils.GetSiteText(
                    TextTitles.INAC_PRESET_CATALOG_ROUTER_POPUP_NAME),
                WifiRouterPopupDesc = SiteTextUtils.GetSiteText(
                    TextTitles.INAC_PRESET_CATALOG_ROUTER_DESCRIPTION),
                WifiRouterPopupNextButtonTitle = SiteTextUtils.GetSiteText(
                    TextTitles.INAC_PRESET_CATALOG_ROUTER_DISCARD_CHANGES),
                WifiRouterPopupAddButtonTitle = SiteTextUtils.GetSiteText(
                    TextTitles.INAC_PRESET_CATALOG_ADD_ROUTER),
                WifiRouterPopupCancelButtonTitle = SiteTextUtils.GetSiteText(
                    TextTitles.INAC_PRESET_CATALOG_DISCARD_ROUTER_TEXT),

                WifiRentedStatusText = SiteTextUtils.GetSiteText(
                    TextTitles.INAC_PRESET_CATALOG_RENT_ROUTER_TEXT),
                WifiRentedStatusMappedText = SiteTextUtils.GetSiteText(
                    TextTitles.INAC_PRESET_CATALOG_MAPPING_RENT_ROUTER_TEXT),
                WifiGiftStatusText = SiteTextUtils.GetSiteText(
                    TextTitles.INAC_PRESET_CATALOG_GIFT_ROUTER_TEXT),
                WifiGiftStatusMappedText = SiteTextUtils.GetSiteText(
                    TextTitles.INAC_PRESET_CATALOG_MAPPING_GIFT_ROUTER_TEXT),
                WifiBuyStatusText = SiteTextUtils.GetSiteText(
                    TextTitles.INAC_PRESET_CATALOG_BOUGHT_ROUTER_TEXT),
                WifiBuyOutStatusText = SiteTextUtils.GetSiteText(
                    TextTitles.INAC_PRESET_CATALOG_REDEEMED_ROUTER_TEXT),
                WifiInstallmentStatusText = SiteTextUtils.GetSiteText(
                    TextTitles.INAC_PRESET_CATALOG_INSTALLMENT_ROUTER_TEXT),
                WifiInstallmentStatusMappedText = SiteTextUtils.GetSiteText(
                    TextTitles.INAC_PRESET_CATALOG_REDEEM_ROUTER_TEXT),

            AntivirusTitle = SiteTextUtils.GetSiteText(
                    TextTitles.INAC_PRESET_CATALOG_ANTIVIR_NAME),
                PhoneTitle = SiteTextUtils.GetSiteText(
                    TextTitles.INAC_PRESET_CATALOG_NET_PHONE_NAME),

                ConnectInternetText = SiteTextUtils.GetSiteText(
                    TextTitles.INAC_PRESET_CATALOG_INET_POPUP_TEXT),
                ConnectTvText = SiteTextUtils.GetSiteText(
                    TextTitles.INAC_PRESET_CATALOG_TV_POPUP_TEXT),
                ConnectVsuText = SiteTextUtils.GetSiteText(
                    TextTitles.INAC_PRESET_CATALOG_VSU_POPUP_TEXT),

                LegalPopupTitle = SiteTextUtils.GetSiteText(
                    TextTitles.INAC_PRESET_CATALOG_LEGAL_POPUP_TITLE),

                PresetItemsOrder = AppConfiguration.InacPresetsServicesSortOrder
                    .Select(s => Enum.TryParse(s, true, out ServiceTypeEnum type) ?
                        (int)type :
                        -1)
                    .Where(x => x != -1)
                    .ToArray(),
                GroupsOrder = AppConfiguration.InacPresetsCategorySortOrder,
                SortOrder = AppConfiguration.InacPresetsSortOrder,
                ProfileUrl = SitemapHelper.HomeProfilePage?.Url
            };

            return await Task.FromResult(result);
        }

        /// <summary>
        /// Группы пресетов
        /// </summary>
        /// <returns></returns>
        private object[] PrepareGroups()
        {
            return new object[]
            {
                new
                {
                    Image = SiteTextUtils.GetSiteText(
                        TextTitles.INAC_PRESET_CATALOG_CATEGORY_IMAGES_INET_TV),
                    Title = SiteTextUtils.GetSiteText(
                        TextTitles.INAC_PRESET_CATALOG_INET_TV_CATEGORY_NAME),
                    Code = Groups.InetTv.GetDescription()
                },
                new
                {
                    Image = SiteTextUtils.GetSiteText(
                        TextTitles.INAC_PRESET_CATALOG_CATEGORY_IMAGES_INET),
                    Title = SiteTextUtils.GetSiteText(
                        TextTitles.INAC_PRESET_CATALOG_INET_CATEGORY_NAME),
                    Code = Groups.Inet.GetDescription()
                },
                new
                {
                    Image = SiteTextUtils.GetSiteText(
                        TextTitles.INAC_PRESET_CATALOG_CATEGORY_IMAGES_TV),
                    Title = SiteTextUtils.GetSiteText(
                        TextTitles.INAC_PRESET_CATALOG_TV_CATEGORY_NAME),
                    Code = Groups.Tv.GetDescription()
                },
            };
        }

        /// <summary>
        /// Группы пресетов
        /// </summary>
        enum Groups
        {
            /// <summary>
            /// интернет + ТВ
            /// </summary>
            [Description("INETTV")]
            InetTv,

            /// <summary>
            /// интернет
            /// </summary>
            [Description("INET")]
            Inet,

            /// <summary>
            /// ТВ
            /// </summary>
            [Description("TV")]
            Tv
        };
    }
}