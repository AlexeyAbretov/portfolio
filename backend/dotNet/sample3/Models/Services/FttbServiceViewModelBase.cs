using Vendor.Client.Models.Enums.USSS;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Presets
{
    /// <summary>
    /// Базовая модель услуги
    /// </summary>
    public class FttbServiceViewModelBase
    {
        public string Name { get; set; }

        /// <summary>
        /// Тип услуги
        /// </summary>
        public ServiceTypeEnum Type { get; set; }

        /// <summary>
        /// Ид.
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// Признак подключения
        /// </summary>
        public bool IsConnected { get; set; }

        /// <summary>
        /// АП
        /// </summary>
        public decimal? Fee { get; set; }
    }
}