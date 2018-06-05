using Vendor.Client.WebApp.Models.Equipments;
using Vendor.Core.Enums;
using Vendor.Interface.Data.USSS;
using Vendor.Interface.Enums;
using System.Collections.Generic;
using static Vendor.Client.WebApp.Models.Equipments.InacEquipmentBase;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Presets.Converters
{
    public class WifiRentConverter : ServiceConverterBase
    {
        private Dictionary<string, OwnershipTypeEnum> _types = new Dictionary<string, OwnershipTypeEnum>
        {
            { OwnershipType.B.GetDescription(), OwnershipTypeEnum.Buyed },
            { OwnershipType.I.GetDescription(), OwnershipTypeEnum.ByInstallments },
            { OwnershipType.G.GetDescription(), OwnershipTypeEnum.Gift },
            { OwnershipType.R.GetDescription(), OwnershipTypeEnum.Rented },
            { OwnershipType.O.GetDescription(), OwnershipTypeEnum.BuyOut }
        };

        private Dictionary<string, AccType> _accTypes = new Dictionary<string, AccType>
        {
            { AccType.ActiveDays.GetDescription(), AccType.ActiveDays },
            { AccType.AllBc.GetDescription(), AccType.AllBc },
            { AccType.FullBc.GetDescription(), AccType.FullBc },
            { AccType.AllDays.GetDescription(), AccType.AllDays }
        };

        public override FttbPresetServiceViewModel Convert(
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
                result.AccumulatorPeriodType = _accTypes.ContainsKey(acc) ?
                _accTypes[acc] :
                AccType.None;
            }

            result.InstallmentTime = service.GetAdditionalParamValue<decimal>(
                AdditionalParamNames.InstallmentTime);

            return result;
        }
    }
}