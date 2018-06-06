using Vendor.Core.Enums;
using Vendor.Interface.Data.USSS;
using Vendor.Interface.Enums;
using System.Collections.Generic;
using static Vendor.Client.WebApp.Models.Equipments.InacEquipmentBase;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Presets.Converters
{
    public class WifiRentConverter : ServiceConverterBase<WifiRentViewModel>
    {
        private Dictionary<string, OwnershipTypeEnum> _types = new Dictionary<string, OwnershipTypeEnum>
        {
            // по факту 2 перечисления с одинаковыми значениями
            { OwnershipType.B.GetDescription(), OwnershipTypeEnum.Buyed },
            { OwnershipType.I.GetDescription(), OwnershipTypeEnum.ByInstallments },
            { OwnershipType.G.GetDescription(), OwnershipTypeEnum.Gift },
            { OwnershipType.R.GetDescription(), OwnershipTypeEnum.Rented },
            { OwnershipType.O.GetDescription(), OwnershipTypeEnum.BuyOut }
        };

        private Dictionary<string, AccumulatorType> _accTypes = new Dictionary<string, AccumulatorType>
        {
            // преобразовать строку из доп. параметров в перечисление
            { AccumulatorType.ActiveDays.GetDescription(), AccumulatorType.ActiveDays },
            { AccumulatorType.AllBc.GetDescription(), AccumulatorType.AllBc },
            { AccumulatorType.FullBc.GetDescription(), AccumulatorType.FullBc },
            { AccumulatorType.AllDays.GetDescription(), AccumulatorType.AllDays }
        };

        public override WifiRentViewModel Convert(
            Service service,
            List<AccumulatorsResponseViewModel> accumulators = null)
        {
            var result = base.Convert(service);

            var type = service.GetAdditionalParamValue(
                AdditionalParamNames.OwnershipType);

            if (!string.IsNullOrWhiteSpace(type))
            {
                result.OwnershipType = _types.ContainsKey(type) ?
                    _types[type] :
                    OwnershipTypeEnum.Unknown;
            }

            var acc = service.GetAdditionalParamValue(AdditionalParamNames.AccType);

            if (!string.IsNullOrWhiteSpace(acc))
            {
                result.AccumulatorType = _accTypes.ContainsKey(acc) ?
                    _accTypes[acc] :
                    AccumulatorType.None;
            }

            result.InstallmentTime = service.GetAdditionalParamValue<decimal>(
                AdditionalParamNames.InstallmentTime);

            return result;
        }
    }
}