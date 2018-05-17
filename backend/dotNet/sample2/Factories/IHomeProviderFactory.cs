using Vendor.Client.WebApp.Models.HomeTariffs.Api.Providers;
using Vendor.Interface.Data.DPC;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Api.Factories
{
    /// <summary>
    /// Контракт фабрики провадеров
    /// </summary>
    public interface IHomeProviderFactory
    {
        /// <summary>
        /// Конструирует провайдер по параметрам
        /// </summary>
        /// <param name="regionId">Регион</param>
        /// <param name="type">Тип продукта</param>
        /// <returns></returns>
        IHomeProvider GetProvider(int regionId, ProductType type = ProductType.None);
    }
}