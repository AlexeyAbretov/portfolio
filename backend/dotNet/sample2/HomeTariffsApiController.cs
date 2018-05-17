using Vendor.Client.Models.Widgets;
using Vendor.Client.WebApp.App_Core;
using Vendor.Client.WebApp.Helpers;
using Vendor.Client.WebApp.Models.CheckConnect;
using Vendor.Client.WebApp.Models.HomeBillBasket.Bill.Set;
using Vendor.Client.WebApp.Models.HomeTariffs;
using Vendor.Client.WebApp.Models.HomeTariffs.Api;
using Vendor.Infrastructure.Client.Mvc;
using Vendor.Infrastructure.Client.Sso;
using Vendor.Core.Web;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;
using Vendor.Core.Logger;
using Vendor.Core.Web.Controllers;

namespace Vendor.Client.WebApp.Controllers.Home
{
    /// <summary>
    /// Контроллер для виджета списка домашних тарифов
    /// </summary>
    public partial class HomeTariffsApiController : QAControllerBase
    {
        private readonly ILogger _logger = null;
        private readonly IHomeTariffsApiService _apiService = null;

        public HomeTariffsApiController(
            IHomeTariffsApiService apiService,
            ILogger logger)
        {
            _logger = logger;
            _apiService = apiService;
        }

        /// <summary>
        /// Возвращает список домашних тарифов
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        [HttpPost]
        [OutputCache(CacheProfile = CacheProfiles.HomeTariffApi, VaryByParam = "regionId")]
        public async virtual Task<ActionResult> ListAjax(
            int regionId)
        {
            var result = await _apiService.GetTariffs(
                regionId);

            result.AddToCartUrl =
                Url.Action(
                    ActionNameConstants.AddToCart,
                    NameConst);

            return this.JsonData(result);
        }

        /// <summary>
        /// Возвращает тариф
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        [HttpPost]
        public async virtual Task<ActionResult> GetTariff(
            int regionId, string id, string type)
        {
            try
            {
                var result = await _apiService.GetTariff(
                    id, type, regionId);

                if (result == null)
                {
                    return this.JsonView(
                        HomeTariffPageController.Views.NewCatalog.Shared._404,
                        Get404(),
                        new Dictionary<string, Helpers.JsonError>
                        {
                            { "error", new Helpers.JsonError("error") }
                        });
                }

                result.AddToCartUrl =
                    Url.Action(
                        ActionNameConstants.AddToCart,
                        NameConst);

                return this.JsonData(result);
            }
            catch (Exception ex)
            {
                _logger.ErrorException(ex.Message, ex);

                return this.JsonView(
                    HomeTariffPageController.Views.NewCatalog.Shared._500,
                    Get404(),
                    new Dictionary<string, Helpers.JsonError>
                    {
                        { "error", new Helpers.JsonError("error") }
                    });
            }
        }

        [AjaxOnly]
        [HttpPost]
        public async virtual Task<ActionResult> GetTariffCompact(
            int regionId, string id, string type)
        {
            try
            {
                var result = await _apiService.GetTariffCompact(
                    id, type, regionId);

                if (result == null)
                {
                    return this.JsonView(
                        HomeTariffPageController.Views.NewCatalog.Shared._404,
                        Get404(),
                        new Dictionary<string, Helpers.JsonError>
                        {
                            { "404", new Helpers.JsonError("404") }
                        });
                }

                result.AddToCartUrl =
                    Url.Action(
                        ActionNameConstants.AddToCart,
                        NameConst);

                return this.JsonData(result);
            }
            catch (Exception ex)
            {
                _logger.ErrorException(ex.Message, ex);

                return this.JsonView(
                    HomeTariffPageController.Views.NewCatalog.Shared._500,
                    Get404(),
                    new Dictionary<string, Helpers.JsonError>
                    {
                        { "error", new Helpers.JsonError("error") }
                    });
            }
        }

        #region request, basket

        [AjaxOnly]
        [HttpPost]
        public virtual ActionResult AddToCart(BillSetItem[] items)
        {
            return _apiService.AddToCart(items);
        }

        #endregion

        #region Address

        /// <summary>
        /// Возвращает список городов/регионов
        /// </summary>
        /// <param name="term"></param>
        /// <returns></returns>
        [AjaxOnly]
        [HttpPost]
        [OutputCache(CacheProfile = CacheProfiles.CheckConnectWidgetAjaxProfile)]
        public virtual ActionResult GetCities(string term)
        {
            var items = CheckConnectModel.GetCities(term);
            return this.JsonData(items);
        }

        /// <summary>
        /// Возвращает список улиц
        /// </summary>
        /// <param name="cityName"></param>
        /// <param name="regionId"></param>
        /// <param name="term"></param>
        /// <returns></returns>
        [AjaxOnly]
        [HttpPost]
        [OutputCache(CacheProfile = CacheProfiles.CheckConnectWidgetAjaxProfile)]
        public virtual ActionResult GetStreets(string cityName, int regionId, string term)
        {
            var streets = CheckConnectModel.GetStreets(cityName, regionId, term);
            return this.JsonData(streets);
        }

        /// <summary>
        /// Возвращает список домов
        /// </summary>
        /// <param name="streetId"></param>
        /// <param name="term"></param>
        /// <returns></returns>
        [AjaxOnly]
        [HttpPost]
        [OutputCache(CacheProfile = CacheProfiles.CheckConnectWidgetAjaxProfile)]
        public virtual ActionResult GetHouses(int streetId, string term)
        {
            var houses = CheckConnectModel.GetHouses(streetId, term);
            return this.JsonData(houses);
        }

        /// <summary>
        /// Записывает статус проверки адреса
        /// </summary>
        /// <param name="result"></param>
        /// <returns></returns>
        [AjaxOnly]
        [HttpPost]
        public virtual ActionResult SetState(Address result)
        {
            return new CheckConnectWidgetBaseController<CheckConnectBaseWidget>().SetState(result);
        }

        /// <summary>
        /// Возвращает статус проверки адреса
        /// </summary>
        /// <param name="result"></param>
        /// <returns></returns>
        [AjaxOnly]
        [HttpPost]
        public virtual ActionResult GetState(Address result)
        {
            return this.JsonData(CheckConnectModel.Result);
        }

        #endregion

        #region Shared

        internal static Home404ViewModel Get404()
        {
            var model = new Home404ViewModel();
            var catalog = SitemapHelper.BaseNewHomeCatalogPage;
            if (catalog != null)
            {
                model.CatalogUrl = catalog.Url;
            }

            return model;
        }

        #endregion

        [AjaxOnly]
        [HttpPost]
        [RequireAuth(requireFttb: true, requireMobile: false)]
        async public virtual Task<ActionResult> GetTvPackageChannels(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return new HttpNotFoundResult();
            }

            var viewModel = await new TvTariffModel().GetTvChannels(id,
                SsoHelper.FttbLogin);
            return this.JsonData(viewModel.BaseChannels);
        }
    }
}