using Vendor.Client.Models.Enums.USSS;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Presets.Converters
{
    public interface IHomePresetConverterFactory
    {
        StandaloneServiceConverterBase GetStandaloneServiceConverter(
            ServiceTypeEnum type);

        ServiceConverterBase GetServiceConverter(
            ServiceTypeEnum type);
    }
}