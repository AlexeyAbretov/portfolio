using Vendor.Interface.Data.HomeTariffs.Bill;
using Vendor.Core.Enums;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Api.Providers
{
    /// <summary>
    /// Базовый провайдер
    /// </summary>
    public abstract class HomeProviderBase : IHomeProvider
    {
        /// <summary>
        /// Регион провайдера
        /// </summary>
        protected readonly int RegionId = 0;

        /// <summary>
        /// Список делегаторов получения продуктов
        /// </summary>
        protected readonly Dictionary<string, Func<string, Task<HomeItemCardViewModel>>> _productsGetList;

        /// <summary>
        /// Конструктор
        /// </summary>
        /// <param name="regionId">Регион</param>
        public HomeProviderBase(
            int regionId)
        {
            RegionId = regionId;

            _productsGetList = new Dictionary<string, Func<string, Task<HomeItemCardViewModel>>>
            {
                {
                    Product.Tv.GetDescription().ToLower(),
                    GetTvTariff
                },
                {
                    Product.Internet.GetDescription().ToLower(),
                    GetInternetTariff
                },
                {
                    Product.Kit.GetDescription().ToLower(),
                    GetKitTariff
                },
                {
                    Product.Phone.GetDescription().ToLower(),
                    GetPhoneTariff
                }
            };
        }

        /// <summary>
        /// Возвращает тариф
        /// </summary>
        /// <param name="id">Ид.</param>
        /// <param name="type">Тип</param>
        /// <returns></returns>
        public async virtual Task<HomeItemCardViewModel> GetTariff(
            string id, string type)
        {
            var tariffTask = _productsGetList.ContainsKey(type?.ToLower()) ?
                _productsGetList[type?.ToLower()](id) :
                null;

            var listTask = GetTariffs();
            await Task.WhenAll(tariffTask, listTask).ConfigureAwait(false);

            var result = tariffTask.Result;
            if (result != null)
            {
                result.Tariffs = listTask.Result;
            }

            return result;
        }

        /// <summary>
        /// Возвращает тариф телефона
        /// </summary>
        /// <param name="id">Ид.</param>
        /// <returns></returns>
        internal abstract Task<HomeItemCardViewModel> GetPhoneTariff(
            string id);

        /// <summary>
        /// Возвращает тариф бандла
        /// </summary>
        /// <param name="id">Ид.</param>
        /// <returns></returns>
        internal abstract Task<HomeItemCardViewModel> GetKitTariff(
            string id);

        /// <summary>
        /// Возвращает тариф интернета
        /// </summary>
        /// <param name="id">Ид.</param>
        /// <returns></returns>
        internal abstract Task<HomeItemCardViewModel> GetInternetTariff(
            string id);

        /// <summary>
        /// Возвращает тариф тв
        /// </summary>
        /// <param name="id">Ид.</param>
        /// <returns></returns>
        internal abstract Task<HomeItemCardViewModel> GetTvTariff(
            string id);

        /// <summary>
        /// Возвращает тарифы
        /// </summary>
        /// <param name="isArchive">Признак архивности</param>
        /// <returns></returns>
        public abstract Task<HomeTariffApiListViewModel> GetTariffs(
            bool isArchive = false);

        /// <summary>
        /// Возвращает информация об услуге "Поддержка линии"
        /// </summary>
        /// <returns></returns>
        protected abstract ServiceMarketingItem GetSupportService();
    }
}