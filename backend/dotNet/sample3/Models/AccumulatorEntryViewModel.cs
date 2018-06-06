using Vendor.Interface.Data.USSS;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Presets
{
    /// <summary>
    /// сервис, на который будет происходить переключение
    /// </summary>
    public class AccumulatorEntryViewModel
    {
        /// <summary>
        /// ID сервиса, которому соответствует аккумулятор
        /// </summary>
        public string ServiceId { get; set; }

        /// <summary>
        /// Тип скидки: 1 – в рублях, 0 – в процентах
        /// </summary>
        public AccumulatorDiscountType? DiscountType { get; set; }

        /// <summary>
        /// Размер скидки в аккумуляторе в рублях/процентах
        /// </summary>
        public int? Discount { get; set; }

        /// <summary>
        /// Цена в единицах валюты абонента
        /// </summary>
        public decimal? Price { get; set; }
    }
}