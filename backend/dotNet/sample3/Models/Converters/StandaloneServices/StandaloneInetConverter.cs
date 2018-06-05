using Vendor.Client.WebApp.Controllers;
using Vendor.Interface.Data.USSS;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Presets.Converters
{
    public class StandaloneInetConverter : StandaloneServiceConverterBase
    {
        public override string GetAction(Service service)
        {
            return HomeTariffPageController.ActionNameConstants.Internet;
        }
    }
}