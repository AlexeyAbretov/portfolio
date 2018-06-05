using Vendor.Interface.Data.USSS;
using Vendor.Interface.Enums;
using System.Collections.Generic;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Presets.Converters
{
    public class InetConverter : ServiceConverterBase
    {
        public override FttbPresetServiceViewModel Convert(
            Service service,
            List<AccumulatorsResponseViewModel> accumulators = null)
        {
            var result = base.Convert(service);

            result.IsLineHolder = service.GetAdditionalParamValue(
                AdditionalParamNames.LineHolder,
                false);
            result.Speed = service.GetAdditionalParamValue(
                AdditionalParamNames.VspeedIn,
                0);

            return result;
        }
    }
}