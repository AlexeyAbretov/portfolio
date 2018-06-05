using Vendor.Client.WebApp.Models.Equipments;
using Vendor.Interface.Data.USSS;
using static Vendor.Client.WebApp.Models.Equipments.InacEquipmentBase;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Presets
{
    /// <summary>
    /// Сервис инак-пресета
    /// </summary>
    public class FttbPresetServiceViewModel : FttbServiceViewModelBase
    {
        /// <summary>
        /// АП
        /// </summary>
        public decimal? Fee { get; set; }

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
        /// Признак выделенной линии
        /// </summary>
        public bool IsLineHolder { get; set; }

        /// <summary>
        /// Признак Tve
        /// </summary>
        public bool IsTve { get; set; }

        /// <summary>
        /// Скорость
        /// </summary>
        public int Speed { get; set; }

        /// <summary>
        /// Шаг увеличения скорости
        /// </summary>
        public int SpeedUp { get; set; }

        /// <summary>
        /// Максимальная скорость
        /// </summary>
        public int MaxSpeed { get; set; }

        /// <summary>
        /// Признак наличия подарка
        /// </summary>
        public bool HasGift { get; set; }

        /// <summary>
        /// Кол-во каналов
        /// </summary>
        public int Channels { get; set; }

        /// <summary>
        /// Тв пакеты
        /// </summary>
        public FttbTvPacketViewModel[] Packets { get; set; }

        /// <summary>
        /// Ид. подключения
        /// </summary>
        public long? SplId { get; set; }

        /// <summary>
        /// Тип аккумулятора
        /// </summary>
        public AccumulatorDiscountType AccumulatorDiscountType { get; set; }
            = AccumulatorDiscountType.None;

        /// <summary>
        /// Тип аккумулятора
        /// </summary>
        public AccType AccumulatorPeriodType { get; set; }
            = AccType.None;

        /// <summary>
        /// Значение аккумулятора
        /// </summary>
        public int? Accumulator { get; set; }

        /// <summary>
        /// Краткое описание
        /// </summary>
        public string ShortDescription { get; set; }

        /// <summary>
        /// Тип владения
        /// </summary>
        public OwnershipTypeEnum OwnershipType { get; set; }
            = OwnershipTypeEnum.Unknown;

        /// <summary>
        /// Время владения
        /// </summary>
        public decimal InstallmentTime { get; set; }
    }
}