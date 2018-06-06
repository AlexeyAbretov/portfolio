using Vendor.Client.Models.Enums.USSS;
using Vendor.Interface.Data.USSS;
using System.Collections.Generic;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Presets.Converters
{
    public interface IHomePresetServiceFactory
    {
        FttbServiceViewModel ConvertStandaloneService(
            Service service);

        FttbPresetServiceViewModel ConvertPresetService(
            Service service,
            List<AccumulatorsResponseViewModel> accumulators);
    }
}