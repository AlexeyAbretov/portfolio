using System.Threading.Tasks;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Api.Providers
{
    /// <summary>
    /// Контракт провайдера
    /// </summary>
    public interface IHomeProvider
    {
        /// <summary>
        /// Список тарифов
        /// </summary>
        /// <returns></returns>
        Task<HomeTariffApiListViewModel> GetTariffs(
            bool isArchive = false);

        /// <summary>
        /// Возвращает тариф
        /// </summary>
        /// <param name="id">Ид./алиас тарифа</param>
        /// <param name="type">Тип тарифа</param>
        /// <returns></returns>
        Task<HomeItemCardViewModel> GetTariff(
            string id, string type);
    }
}