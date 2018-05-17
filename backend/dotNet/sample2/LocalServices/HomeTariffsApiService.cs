using Vendor.Client.WebApp.Controllers.Home;
using Vendor.Client.WebApp.Models.HomeBillBasket.Bill.Set;
using Vendor.Client.WebApp.Models.HomeTariffs.Api.Factories;
using Vendor.Client.WebApp.Models.HomeTariffs.Api.Providers;
using Vendor.Interface.Data.Dictionary;
using Vendor.Interface.Data.DPC;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Api
{
    /// <summary>
    /// Сервис api домашних тарифов
    /// </summary>
    public class HomeTariffsApiService : IHomeTariffsApiService
    {
        private readonly IHomeProviderFactory _factory = null;

        /// <summary>
        /// Конструктор
        /// </summary>
        /// <param name="factory">Фабрика провайдеров</param>
        public HomeTariffsApiService(IHomeProviderFactory factory)
        {
            _factory = factory;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="regionId"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        protected virtual IHomeProvider GetProvider(
            int regionId,
            ProductType type = ProductType.None)
        {
            return _factory.GetProvider(regionId, type);
        }

        /// <summary>
        /// Список тарифов
        /// </summary>
        /// <param name="regionId">Регион</param>
        /// <returns></returns>
        public async Task<HomeTariffApiListViewModel> GetTariffs(
            int regionId)
        {
            return await GetProvider(regionId).GetTariffs();
        }

        /// <summary>
        /// Возвращает тариф
        /// </summary>
        /// <param name="id">Ид./алиас тарифа</param>
        /// <param name="type">Тип тарифа</param>
        /// <param name="regionId">Регион</param>
        /// <returns></returns>
        public async Task<HomeItemCardViewModel> GetTariff(
            string id, string type, int regionId)
        {
            var result = await GetProvider(regionId).GetTariff(
                id, type);

            return result;
        }

        /// <summary>
        /// Возвращает тв тариф. Исключены данные о списке тарифов.
        /// </summary>
        /// <param name="id">Ид./алиас тарифа</param>
        /// <param name="type">Тип тарифа</param>
        /// <param name="regionId">Регион</param>
        /// <returns></returns>
        public async Task<HomeItemCardViewModel> GetTariffCompact(
            string id, string type, int regionId)
        {
            var result = await GetTariff(
                id, type, regionId);

            return result;
        }

        /// <summary>
        /// Добавление элементов заявки в корзину
        /// </summary>
        /// <param name="items">Элементы заявки</param>
        /// <returns></returns>
        public virtual ActionResult AddToCart(BillSetItem[] items)
        {
            items
                .ToList()
                .ForEach(e =>
                {
                    e.Fee.IgnorePrice = e.Fee != null;
                });

            return new BillHomeWidgetController().AddToCart(items, DateTime.MinValue);
        }

        /// <summary>
        /// Возвращает архивные тарифы
        /// </summary>
        /// <param name="id">Текущий фильтр</param>
        /// <param name="regionId">Регион</param>
        /// <returns></returns>
        public virtual async Task<dynamic> GetArchiveTariffs(
            string id,
            int regionId)
        {
            var list = await GetProvider(regionId).GetTariffs(true);

            var result = new
            {
                //настройки и тексты
                Options = new
                {
                    // заголовок страницы
                    Title = SiteTextUtils.GetSiteText(
                        TextTitles.NEW_SHPD_CATALOG_ARCHIVE_TITLE),
                    // таблица Тарифы домашнего интернета и ТВ
                    InetTv = new
                    {
                        // заголовок таблицы
                        title = SiteTextUtils.GetSiteText(
                            TextTitles.NEW_SHPD_CATALOG_ARCHIVE_BUNDLES_TITLE),
                        // колонки таблицы
                        thead = HttpUtility.HtmlDecode(SiteTextUtils.GetSiteText(
                            TextTitles.NEW_SHPD_CATALOG_ARCHIVE_BUNDLES_COLUMNS)),
                    },
                    // таблица Тарифы домашнего интернета
                    Inet = new
                    {
                        title = SiteTextUtils.GetSiteText(
                            TextTitles.NEW_SHPD_CATALOG_ARCHIVE_INET_TARIFFS_TITLE),
                        thead = HttpUtility.HtmlDecode(SiteTextUtils.GetSiteText(
                            TextTitles.NEW_SHPD_CATALOG_ARCHIVE_INET_TARIFFS_COLUMNS)),
                    },
                    // таблица Тарифы домашнего ТВ
                    Tv = new
                    {
                        title = SiteTextUtils.GetSiteText(
                            TextTitles.NEW_SHPD_CATALOG_ARCHIVE_TV_TARIFFS_TITLE),
                        thead = HttpUtility.HtmlDecode(SiteTextUtils.GetSiteText(
                            TextTitles.NEW_SHPD_CATALOG_ARCHIVE_TV_TARIFFS_COLUMNS)),
                    },
                    // таблица Тарифы домашнего телефона
                    Phone = new
                    {
                        title = SiteTextUtils.GetSiteText(
                            TextTitles.NEW_SHPD_CATALOG_ARCHIVE_HOME_PHONE_TARIFFS_TITLE),
                        thead = HttpUtility.HtmlDecode(SiteTextUtils.GetSiteText(
                            TextTitles.NEW_SHPD_CATALOG_ARCHIVE_HOME_PHONE_TARIFFS_COLUMNS)),
                    },
                    // количество элементов в каждой таблице по умолчанию
                    ViewCount = 5,
                    FeeTypeText = SiteTextUtils.GetSiteText(TextTitles.NEW_SHPD_CATALOG_FEE_TEXT)
                },
                // фильтр
                Filter = new
                {
                    // элементы фильтра
                    // todo: уточнить идентификаторы
                    Items = new[]
                    {
                        new
                        {
                            Id = "all",
                            Title = SiteTextUtils.GetSiteText(
                                TextTitles.NEW_SHPD_CATALOG_ARCHIVE_FILTER_ALL)
                        },
                        new
                        {
                            Id = "inetTv",
                            Title = SiteTextUtils.GetSiteText(
                                TextTitles.NEW_SHPD_CATALOG_ARCHIVE_FILTER_BUNDLES)
                        },
                        new
                        {
                            Id = "inet",
                            Title = SiteTextUtils.GetSiteText(
                                TextTitles.NEW_SHPD_CATALOG_ARCHIVE_FILTER_INTERNET)
                        },
                        new
                        {
                            Id = "tv",
                            Title = SiteTextUtils.GetSiteText(
                                TextTitles.NEW_SHPD_CATALOG_ARCHIVE_FILTER_TV)
                        },
                        new
                        {
                            Id = "phone",
                            Title = SiteTextUtils.GetSiteText(
                                TextTitles.NEW_SHPD_CATALOG_ARCHIVE_FILTER_HOME_PHONE)
                        }
                    },
                    Current = string.IsNullOrWhiteSpace(id) ? "all" : id
                },
                // поиск
                Search = new
                {
                    Text = ""
                },
                Items = list.List
            };

            return result;
        }
    }
}