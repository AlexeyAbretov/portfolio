using Vendor.Interface.Data.USSS;
using Vendor.Interface.Enums;
using System.Collections.Generic;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Presets.Converters
{
    public class VsuConverter : ServiceConverterBase
    {
        public override FttbPresetServiceViewModel Convert(
            Service service,
            List<AccumulatorsResponseViewModel> accumulators = null)
        {
            var result = base.Convert(service);

            result.SpeedUp = service.GetAdditionalParamValue(
                AdditionalParamNames.VpdnSpeedUp,
                0);
            result.MaxSpeed = service.GetAdditionalParamValue(
                AdditionalParamNames.VsuMaxSpeed,
                0);

            return result;
        }
    }
}