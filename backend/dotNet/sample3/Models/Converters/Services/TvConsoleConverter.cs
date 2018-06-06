using Vendor.Interface.Data.USSS;
using Vendor.Interface.Enums;
using System.Collections.Generic;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Presets.Converters
{
    public class TvConsoleConverter : ServiceConverterBase<TvConsoleViewModel>
    {
        public override TvConsoleViewModel Convert(
            Service service,
            List<AccumulatorsResponseViewModel> accumulators = null)
        {
            var result = base.Convert(service);

            result.IsTve = service.GetAdditionalParamValue(
                AdditionalParamNames.IsTve,
                false);

            return result;
        }
    }
}