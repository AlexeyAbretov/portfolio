using Vendor.Interface.Data.USSS;
using Vendor.Interface.Enums;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Presets.Converters
{
    public class StandaloneTvCourierConverter : StandaloneServiceConverterBase
    {
        public override decimal GetFee(Service service)
        {
            return service.GetAdditionalParamValue<decimal?>(
                AdditionalParamNames.Price, 0) ?? 0;
        }
    }
}