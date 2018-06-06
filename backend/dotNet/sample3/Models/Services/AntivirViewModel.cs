using Vendor.Interface.Data.USSS;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Presets
{
    public class AntivirViewModel : FttbPresetServiceViewModel
    {
        /// <summary>
        /// Цена из аккумулятора
        /// </summary>
        public decimal AccumulatorPrice { get; set; }

        /// <summary>
        /// Количество лицензий
        /// </summary>
        public int? LicenseCount { get; set; }
    }
}