using Vendor.Client.WebApp.Models.HomeTariffs.Presets;
using Vendor.Interface.Data.USSS;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Vendor.Client.WebApp.LocalServices
{
    /// <summary>
    /// Контракт сервиса инак-пресетов
    /// </summary>
    public interface IHomePresetService
    {
        /// <summary>
        /// Возвращает список инак-пресетов для преставления каталога
        /// </summary>
        /// <param name="login">Логин</param>
        /// <returns></returns>
        Task<FttbPresetViewModel[]> GetPresets(string login);

        /// <summary>
        /// Возвращает список подключенных услуг (кроме инак-пресетов)
        /// </summary>
        /// <param name="login">Логин</param>
        /// <returns></returns>
        Task<FttbServiceViewModel[]> GetServices(string login);

        /// <summary>
        /// Возвращает результат наличия подключенног инак пресета
        /// </summary>
        /// <param name="login">Логин</param>
        /// <returns></returns>
        Task<bool> HasFttbPreset(string login);

        /// <summary>
        /// Возвращает подключенный инак пресет
        /// </summary>
        /// <param name="login">Логин</param>
        /// <returns></returns>
        Task<Service> GetConnectedFttbPreset(string login);

        /// <summary>
        /// Возвращает дсотупные инак-пресеты
        /// </summary>
        /// <param name="login">Логин</param>
        /// <returns></returns>
        Task<List<Service>> GetAvailableFttbPresets(string login);
    }
}
