using Vendor.Client.Models.Pages.Home;
using Vendor.Client.WebApp.App_Core;
using Vendor.Client.WebApp.Models.HomeTariffs;
using Vendor.Client.WebApp.Models.HomeTariffs.Api;
using Vendor.Infrastructure.Client;
using Vendor.Infrastructure.Client.Mvc;
using Vendor.Infrastructure.Client.Mvc.ActionFilters;
using Vendor.Infrastructure.Client.Utils;
using Vendor.Core.Engine;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web.Routing;
using Vendor.Core.Enums;

namespace Vendor.Client.WebApp.Controllers.Home
{
    /// <summary>
    /// Каталог тарифов
    /// </summary>
    [Controls(typeof(HomeCatalogPage))]
    public partial class HomeCatalogPageController : ContentControllerBase<HomeCatalogPage>
    {
        private readonly IHomeTariffsApiService _apiService = null;
        private readonly ITitleFormatter _titleFormatter = null;

        public HomeCatalogPageController(
             IHomeTariffsApiService apiService,
             ITitleFormatter titleFormatter)
        {
            _apiService = apiService;
            _titleFormatter = titleFormatter;
        }

        /// <summary>
        /// Главное представление
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [CheckRegionId]
        [OutputCache(CacheProfile = CacheProfiles.HomeTariffIndexPageProfile, VaryByParam = "none")]
        public virtual async Task<ActionResult> Index(string id)
        {
            var regionId = GlobalContext.Current.Region.Id;
            var result = await _apiService.GetTariffs(
                regionId);

            var model = new HomeTariffsIndexViewModel
            {
                PageType = CurrentItem,
                Tariffs = result,
                ProductId = id
            };

            return View(
                HomeTariffPageController.Views.NewCatalog.Index,
                model);
        }

        /// <summary>
        /// Тв
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [OutputCache(CacheProfile = CacheProfiles.HomeTariffPageTvProfile, VaryByParam = "none")]
        public async virtual Task<ActionResult> Tv(string id)
        {
            return await GetActionResult(id, Product.Tv);
        }

        /// <summary>
        /// Пакеты
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [OutputCache(CacheProfile = CacheProfiles.HomeTariffPageKitProfile, VaryByParam = "none")]
        public async virtual Task<ActionResult> Kit(string id)
        {
            return await GetActionResult(id, Product.Kit);
        }

        /// <summary>
        /// Интернет
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [OutputCache(CacheProfile = CacheProfiles.HomeTariffPageInternetProfile, VaryByParam = "none")]
        public async virtual Task<ActionResult> Internet(string id)
        {
            return await GetActionResult(id, Product.Internet);
        }

        /// <summary>
        /// Домашний телефон
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [OutputCache(CacheProfile = CacheProfiles.HomeTariffPagePhoneProfile, VaryByParam = "none")]
        public async virtual Task<ActionResult> Phone(string id)
        {
            return await GetActionResult(id, Product.Phone);
        }

        /// <summary>
        /// Архив тарифов
        /// </summary>
        /// <param name="id">Тип фильтра</param>
        /// <returns></returns>
        //[OutputCache(CacheProfile = CacheProfiles.HomeTariffPagePhoneProfile, VaryByParam = "none")]
        public async virtual Task<ActionResult> Archive(string id)
        {
            var regionId = GlobalContext.Current.Region.Id;
            var model = await _apiService.GetArchiveTariffs(
                id, regionId);

            ViewBag.Title = CurrentItem.Title;
            ViewBag.FormatTitle = _titleFormatter.Title(CurrentItem, isArchive: true);

            SetMeta();

            return View(HomeTariffPageController.Views.NewCatalog.Archive, model);
        }

        /// <summary>
        /// Настройка тэгов meta
        /// </summary>
        /// <param name="description"></param>
        /// <param name="keywords"></param>
        protected virtual void SetMeta(string description = null, string keywords = null)
        {
            if (string.IsNullOrEmpty(description))
            {
                ViewBag.MetaDescription = CurrentItem.MetaDescription;
            }
            else
            {
                ViewBag.MetaDescription = description;
            }
            if (string.IsNullOrEmpty(keywords))
            {
                ViewBag.MetaKeywords = CurrentItem.Keywords;
            }
            else
            {
                ViewBag.MetaKeywords = keywords;
            }
        }

        /// <summary>
        /// Возвращает представление по типу продукта
        /// </summary>
        /// <param name="id"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        [NonAction]
        protected async virtual Task<ActionResult> GetActionResult(
            string id, Product type)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return View(
                    HomeTariffPageController.Views.Shared._404,
                    HomeTariffPageController.Get404());
            }

            if (type == Product.Phone)
            {
                var page = SitemapHelper.AnonymousHomeCatalog;

                return await Task.Run(
                    () => RedirectToAction(
                        HomeTariffPageController.ActionNameConstants.Phone,
                        HomeTariffPageController.NameConst,
                        new RouteValueDictionary()
                        {
                            { "id", id },
                            { "ui-item", page }
                        }));
            }

            var result = await _apiService.GetTariff(
                id,
                type.GetDescription(),
                GlobalContext.Current.CurrentRegionId.GetValueOrDefault(0));

            if (result == null)
            {
                return View(
                    HomeTariffPageController.Views.Shared._404,
                    HomeTariffPageController.Get404());
            }

            result.ProductType = type.GetDescription();
            result.MetaDescription = CurrentItem.MetaDescription;
            result.MetaKeywords = CurrentItem.Keywords;
            result.AddToCartUrl = Url.Action(
                    HomeTariffsApiController.ActionNameConstants.AddToCart,
                    HomeTariffsApiController.NameConst);
            return View(HomeTariffPageController.Views.NewCatalog.Details, result);
        }
    }
}