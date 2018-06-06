using static Vendor.Client.WebApp.Models.Equipments.InacEquipmentBase;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Presets
{
    public class WifiRentViewModel : FttbPresetServiceViewModel
    {
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