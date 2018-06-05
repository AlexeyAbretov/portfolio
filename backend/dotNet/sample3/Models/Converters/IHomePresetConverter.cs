using Vendor.Interface.Data.USSS;
using System.Collections.Generic;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Presets.Converters
{
    /// <summary>
    /// Интерфейс конвертера инак-пресетов
    /// </summary>
    public interface IHomePresetConverter
    {
        /// <summary>
        /// Преобразует данные о инак-пресете из usss-объекта в объект для клиента
        /// </summary>
        /// <param name="preset">Инак пресет</param>
        /// <returns></returns>
        FttbPresetViewModel ConvertFttbPreset(
            Service preset,
            List<AccumulatorsResponseViewModel> accumulators);
    }
}