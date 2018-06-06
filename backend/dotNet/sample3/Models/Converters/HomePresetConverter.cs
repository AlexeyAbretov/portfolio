using Vendor.Interface.Data.USSS;
using Vendor.Interface.Enums;
using System.Collections.Generic;
using System.Linq;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Presets.Converters
{
    /// <summary>
    /// Конвертер инак-пресетов
    /// </summary>
    public class HomePresetConverter : IHomePresetConverter
    {
        private readonly IHomePresetServiceFactory _factory;

        public HomePresetConverter(IHomePresetServiceFactory factory)
        {
            _factory = factory;
        }

        /// <summary>
        /// Преобразует данные о инак-пресете из usss-объекта в объект для клиента
        /// </summary>
        /// <param name="preset">Инак пресет</param>
        /// <returns></returns>
        public virtual FttbPresetViewModel ConvertFttbPreset(
            Service preset,
            List<AccumulatorsResponseViewModel> accumulators)
        {
            return new FttbPresetViewModel
            {
                Name = preset.Name,
                Id = preset.ServiceId,
                Fee = preset.GetAdditionalParamValue<decimal?>(
                    AdditionalParamNames.MinPriceFttbPreset,
                    null),
                ConnectedFee = (preset.Connected ?? false) ?
                    preset.Price :
                    null,
                IsConnected = preset.Connected ?? false,
                Services = preset?.Containers?
                    .SelectMany(w => w.Services)
                    .Select(x => _factory
                        .ConvertPresetService(x, accumulators))
                    .ToArray(),
                Description = preset.FullDescription
            };
        }
    }
}