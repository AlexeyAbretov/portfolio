using Vendor.Client.WebApp.Models.HomeTariffs.Api.Converters;
using Vendor.Interface.Data.Convergence;
using Vendor.Interface.Data.Dictionary;
using Vendor.Interface.Data.DPC;
using Vendor.Interface.Data.HomeTariffs.Bill;
using Vendor.Interface.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Api.Providers
{
    /// <summary>
    /// Провайдер DPC
    /// </summary>
    public class DpcHomeProvider : HomeProviderBase
    {
        /// <summary>
        /// Конвертер
        /// </summary>
        private readonly DpcHomeConverter _converter = null;

        /// <summary>
        /// Сервис dpc
        /// </summary>
        private readonly IHomeDpcService _dpcService = null;

        /// <summary>
        /// Список делегаторов преобразования продукта
        /// </summary>
        protected readonly Dictionary<ProductType, Func<InacProductBaseDto, HomeItemCardViewModel>> _productConvertList;

        /// <summary>
        /// Конструктор
        /// </summary>
        /// <param name="regionId">Регион</param>
        /// <param name="dpcService">Сервис DPC</param>
        /// <param name="converter">Преобразователь</param>
        public DpcHomeProvider(
            int regionId,
            IHomeDpcService dpcService,
            DpcHomeConverter converter): base(regionId)
        {
            _converter = converter;
            _dpcService = dpcService;

            _productConvertList = new Dictionary<ProductType, Func<InacProductBaseDto, HomeItemCardViewModel>>
            {
                {
                     ProductType.InternetTariff,
                     _converter.ConvertInternetItem
                },
                {
                     ProductType.Bundle,
                     _converter.ConvertKitItem
                },
                {
                     ProductType.PhoneTariff,
                     _converter.ConvertPhoneItem
                },
                {
                     ProductType.TvTariff,
                     _converter.ConvertTvItem
                }
            };
        }

        /// <summary>
        /// Возвращает продукт
        /// </summary>
        /// <param name="id">Ид.</param>
        /// <param name="regionId">Регион</param>
        /// <param name="type">Тип</param>
        /// <returns></returns>
        protected virtual InacProductBaseDto GetProduct(
            string id,
            int regionId,
            ProductType type)
        {
            var product = _dpcService.GetProduct(
               regionId, id, type).Result;

            return product;
        }

        /// <summary>
        /// Возвращает модель для предсталвения карточки продукта
        /// </summary>
        /// <param name="id">Ид. продукта</param>
        /// <param name="regionId">Регион</param>
        /// <param name="type">Тип продукта</param>
        /// <returns></returns>
        protected async virtual Task<HomeItemCardViewModel> GetProductCard(
            string id,
            int regionId,
            ProductType type)
        {
            var product = GetProduct(
               id, regionId, type);

            if (product == null)
            {
                return null;
            }

            var result = _productConvertList.ContainsKey(type) ?
                _productConvertList[type](product) :
                null;

            return result == null ?
                null :
                await Task.FromResult(result);
        }

        /// <summary>
        /// Возвращает тарифы
        /// </summary>
        /// <param name="isArchive">Признак архивности</param>
        /// <returns></returns>
        public override async Task<HomeTariffApiListViewModel> GetTariffs(
            bool isArchive = false)
        {
            var products = await Task.Run(() => _dpcService.GetProducts(
                RegionId, isArchive).Result);

            var result = _converter.ConvertList(
                products,
                GetSupportService()?.Title);

            return result;
        }

        /// <summary>
        /// Возвращает тариф интернета
        /// </summary>
        /// <param name="id">Ид.</param>
        /// <returns></returns>
        internal override async Task<HomeItemCardViewModel> GetInternetTariff(string id)
        {
            return await GetProductCard(
               id, RegionId, ProductType.InternetTariff);
        }

        /// <summary>
        /// Возвращает тариф бандла
        /// </summary>
        /// <param name="id">Ид.</param>
        /// <returns></returns>
        internal override async Task<HomeItemCardViewModel> GetKitTariff(string id)
        {
            return await GetProductCard(
               id, RegionId, ProductType.Bundle);
        }

        /// <summary>
        /// Возвращает тариф телефона
        /// </summary>
        /// <param name="id">Ид.</param>
        /// <returns></returns>
        internal override async Task<HomeItemCardViewModel> GetPhoneTariff(string id)
        {
            return await GetProductCard(
                id, RegionId, ProductType.PhoneTariff);
        }

        /// <summary>
        /// Возвращает тариф тв
        /// </summary>
        /// <param name="id">Ид.</param>
        /// <returns></returns>
        internal override async Task<HomeItemCardViewModel> GetTvTariff(string id)
        {
            return await GetProductCard(
                id, RegionId, ProductType.TvTariff);
        }

        /// <summary>
        /// Возвращает информация об услуге "Поддержка линии"
        /// </summary>
        /// <returns></returns>
        protected override ServiceMarketingItem GetSupportService()
        {
            return new ServiceMarketingItem
            {
                Title = SiteTextUtils.GetSiteText(TextTitles.TECHNICAL_SUPPORT_LINE_TITLE),
            };
        }
    }
}