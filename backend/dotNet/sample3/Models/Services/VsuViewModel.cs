using Vendor.Interface.Data.USSS;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Presets
{
    public class VsuViewModel : FttbPresetServiceViewModel
    {
        /// <summary>
        /// Шаг увеличения скорости
        /// </summary>
        public int SpeedUp { get; set; }

        /// <summary>
        /// Максимальная скорость
        /// </summary>
        public int MaxSpeed { get; set; }
    }
}