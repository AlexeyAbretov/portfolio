using Vendor.Interface.Data.USSS;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Presets
{
    /// <summary>
    /// Сервис инак-пресета
    /// </summary>
    public class FttbPresetServiceViewModel : FttbServiceViewModelBase
    {
        /// <summary>
        /// Скидка
        /// </summary>
        public decimal Discount { get; set; }

        /// <summary>
        /// Признак обязательной услуги
        /// </summary>
        public bool IsRequired { get; set; }

        /// <summary>
        /// Признак предвключенной услуги
        /// </summary>
        public bool IsPreInclude { get; set; }

        /// <summary>
        /// Признак доступной услуги
        /// </summary>
        public bool IsAllow { get; set; }

        /// <summary>
        /// Признак наличия подарка
        /// </summary>
        public bool HasGift { get; set; }

        /// <summary>
        /// Ид. подключения
        /// </summary>
        public long? SplId { get; set; }

        /// <summary>
        /// Значение аккумулятора
        /// </summary>
        public int? Accumulator { get; set; }

        /// <summary>
        /// Краткое описание
        /// </summary>
        public string ShortDescription { get; set; }

        /// <summary>
        /// Тип аккумулятора
        /// </summary>
        public AccumulatorDiscountType AccumulatorDiscountType { get; set; }
            = AccumulatorDiscountType.None;

        /// <summary>
        /// Тип аккумулятора
        /// </summary>
        public AccumulatorType AccumulatorType { get; set; }
            = AccumulatorType.None;
    }
}