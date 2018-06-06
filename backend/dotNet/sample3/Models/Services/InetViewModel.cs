using Vendor.Interface.Data.USSS;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Presets
{
    public class InetViewModel : FttbPresetServiceViewModel
    {
        /// <summary>
        /// Признак выделенной линии
        /// </summary>
        public bool IsLineHolder { get; set; }

        /// <summary>
        /// Скорость
        /// </summary>
        public int Speed { get; set; }
    }
}