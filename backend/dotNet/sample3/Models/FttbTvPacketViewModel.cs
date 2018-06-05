using Vendor.Interface.Data.USSS;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Presets
{
    /// <summary>
    /// Тв пакет
    /// </summary>
    public class FttbTvPacketViewModel
    {
        /// <summary>
        /// Ид.
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// Название
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Количесвто каналов
        /// </summary>
        public int? Channels { get; set; }

        /// <summary>
        /// Признак обязательности
        /// </summary>
        public bool IsObligatory { get; set; }

        /// <summary>
        /// Признак предвыбранного пакета
        /// </summary>
        public bool IsPreSelected { get; set; }

        /// <summary>
        /// АП
        /// </summary>
        public decimal Fee { get; set; }

        /// <summary>
        /// Тип пакета
        /// </summary>
        public IpTvPacketTypes Type { get; set; }

        /// <summary>
        /// Тип скидки
        /// </summary>
        public AccumulatorDiscountType DiscountType { get; set; }

        /// <summary>
        /// Скидка
        /// </summary>
        public decimal Discount { get; set; }

        /// <summary>
        /// Тип сохранения
        /// </summary>
        public SavePacketStatus SaveStatus { get; set; }

        /// <summary>
        /// Признак подключенного пакета
        /// </summary>
        public bool IsConnected { get; set; }
    }
}