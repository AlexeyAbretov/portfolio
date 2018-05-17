using System.Threading.Tasks;
using System.Web.Mvc;
using Vendor.Client.WebApp.Models.HomeBillBasket.Bill.Set;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Api
{
    /// <summary>
    /// Сервис api домашних тарифов
    /// </summary>
    public interface IHomeTariffsApiService
    {
        /// <summary>
        /// Добавление элементов заявки в корзину
        /// </summary>
        /// <param name="items">Элементы заявки</param>
        /// <returns></returns>
        ActionResult AddToCart(BillSetItem[] items);

        /// <summary>
        /// Возвращает архивные тарифы
        /// </summary>
        /// <param name="id">Текущий фильтр</param>
        /// <param name="regionId">Регион</param>
        /// <returns></returns>
        Task<dynamic> GetArchiveTariffs(string id, int regionId);

        /// <summary>
        /// Возвращает тв тариф. Исключены данные о списке тарифов.
        /// </summary>
        /// <param name="id">Ид./алиас тарифа</param>
        /// <param name="type">Тип тарифа</param>
        /// <param name="regionId">Регион</param>
        /// <returns></returns>
        Task<HomeItemCardViewModel> GetTariffCompact(string id, string type, int regionId);

        /// <summary>
        /// Возвращает тв тариф
        /// </summary>
        /// <param name="id">Ид./алиас тарифа</param>
        /// <param name="type">Тип тарифа</param>
        /// <param name="regionId">Регион</param>
        /// <returns></returns>
        Task<HomeItemCardViewModel> GetTariff(string id, string type, int regionId);

        /// <summary>
        /// Список тарифов
        /// </summary>
        /// <param name="regionId">Регион</param>
        /// <returns></returns>
        Task<HomeTariffApiListViewModel> GetTariffs(int regionId);
    }
}