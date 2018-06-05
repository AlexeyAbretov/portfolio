namespace Vendor.Client.WebApp.Models.HomeTariffs.Presets
{
    /// <summary>
    /// Инак пресет
    /// </summary>
    public class FttbPresetViewModel
    {
        /// <summary>
        /// Название
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Ид.
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// Базовая АП
        /// </summary>
        public decimal? Fee { get; set; }

        /// <summary>
        /// Признак подключенности
        /// </summary>
        public bool IsConnected { get; set; }

        /// <summary>
        /// Услуги
        /// </summary>
        public FttbPresetServiceViewModel[] Services { get; set; }

        /// <summary>
        /// Описание
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Лигал
        /// </summary>
        public string Legal { get; set; }

        /// <summary>
        /// АП подключенного пресета
        /// </summary>
        public decimal? ConnectedFee { get; set; }
    }
}