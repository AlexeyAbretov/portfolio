using Vendor.Client.Models.Enums.USSS;
using System.Collections.Generic;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Presets.Converters
{
    public class HomePresetConverterFactory : IHomePresetConverterFactory
    {
        private static readonly Dictionary<ServiceTypeEnum, StandaloneServiceConverterBase> _standaloneConverters =
            new Dictionary<ServiceTypeEnum, StandaloneServiceConverterBase>
            {
                { ServiceTypeEnum.VPDN, new StandaloneInetConverter() },
                { ServiceTypeEnum.TVE_TARIFF_ENTITY, new StandaloneTvConverter() },
                { ServiceTypeEnum.IPTV_TARIFF_ENTITY, new StandaloneTvConverter() },
                { ServiceTypeEnum.BUNDLE, new StandaloneBundleConverter() },
                { ServiceTypeEnum.IPTV_PAID_COURIER_CALL, new StandaloneTvCourierConverter() }
            };

        private static readonly StandaloneServiceConverterBase _baseStanaloneServiceConverter =
            new StandaloneServiceConverterBase();

        private static readonly Dictionary<ServiceTypeEnum, ServiceConverterBase> _serviceConverters =
           new Dictionary<ServiceTypeEnum, ServiceConverterBase>
           {
                { ServiceTypeEnum.VPDN, new InetConverter() },
                { ServiceTypeEnum.TVE_TARIFF_ENTITY, new TvConverter() },
                { ServiceTypeEnum.IPTV_TARIFF_ENTITY, new TvConverter() },
                { ServiceTypeEnum.IPTV_CONSOLE_RENT, new TvConsoleConverter() },
                { ServiceTypeEnum.VSU_SERVICE, new VsuConverter() },
                { ServiceTypeEnum.WIFI_RENT, new WifiRentConverter() },
           };

        private static readonly ServiceConverterBase _baseServiceConverter =
            new ServiceConverterBase();

        public StandaloneServiceConverterBase GetStandaloneServiceConverter(
            ServiceTypeEnum type)
        {
            if (_standaloneConverters.ContainsKey(type))
            {
                return _standaloneConverters[type];
            }

            return _baseStanaloneServiceConverter;
        }

        public ServiceConverterBase GetServiceConverter(
            ServiceTypeEnum type)
        {
            if (_serviceConverters.ContainsKey(type))
            {
                return _serviceConverters[type];
            }

            return _baseServiceConverter;
        }
    }
}