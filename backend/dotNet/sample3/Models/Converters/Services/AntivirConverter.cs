using Vendor.Interface.Data.USSS;
using Vendor.Interface.Enums;
using System.Collections.Generic;
using System.Linq;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Presets.Converters
{
    public class AntivirConverter : ServiceConverterBase<AntivirViewModel>
    {
        public override AntivirViewModel Convert(
            Service service,
            List<AccumulatorsResponseViewModel> accumulators = null)
        {
            var result = base.Convert(service);

            var accId = service.GetAdditionalParamValue<int?>(
                AdditionalParamNames.AccId,
                null);

            var acc = accumulators?
                .FirstOrDefault(x => x.Id == accId)?
                .Services?
                .FirstOrDefault(x => x.ServiceId == service?.ServiceId);

            result.AccumulatorPrice = acc?.Price ?? 0;
            result.LicenseCount = service.GetAdditionalParamValue<int?>(
                AdditionalParamNames.LicenseCount,
                0);

            return result;
        }
    }
}