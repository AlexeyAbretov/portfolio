using Vendor.Client.Models.Enums.USSS;
using Vendor.Interface.Data.USSS;
using System.Collections.Generic;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Presets.Converters
{
    public class HomePresetConverterFactory : IHomePresetServiceFactory
    {
        public FttbServiceViewModel ConvertStandaloneService(
            Service service)
        {
            switch (service.ServiceType)
            {
                case ServiceTypeEnum.VPDN:
                    return new StandaloneInetConverter()
                        .Convert(service);
                case ServiceTypeEnum.TVE_TARIFF_ENTITY:
                case ServiceTypeEnum.IPTV_TARIFF_ENTITY:
                    return new StandaloneTvConverter()
                        .Convert(service);
                case ServiceTypeEnum.BUNDLE:
                    return new StandaloneBundleConverter()
                        .Convert(service);
                case ServiceTypeEnum.IPTV_PAID_COURIER_CALL:
                    return new StandaloneTvCourierConverter()
                        .Convert(service);
                default:
                    return new StandaloneServiceConverterBase()
                        .Convert(service);
            }
        }

        public FttbPresetServiceViewModel ConvertPresetService(
            Service service,
            List<AccumulatorsResponseViewModel> accumulators)
        {
            switch(service.ServiceType)
            {
                case ServiceTypeEnum.VPDN:
                    return new InetConverter()
                        .Convert(service, accumulators);
                case ServiceTypeEnum.TVE_TARIFF_ENTITY:
                case ServiceTypeEnum.IPTV_TARIFF_ENTITY:
                    return new TvConverter()
                        .Convert(service, accumulators);
                case ServiceTypeEnum.IPTV_CONSOLE_RENT:
                    return new TvConsoleConverter()
                        .Convert(service, accumulators);
                case ServiceTypeEnum.VSU_SERVICE:
                    return new VsuConverter()
                        .Convert(service, accumulators);
                case ServiceTypeEnum.WIFI_RENT:
                    return new VsuConverter()
                        .Convert(service, accumulators);
                case ServiceTypeEnum.KASPER:
                case ServiceTypeEnum.ESET:
                case ServiceTypeEnum.DR_WEB:
                    return new AntivirConverter()
                        .Convert(service, accumulators);
                default:
                    return new ServiceConverterBase<FttbPresetServiceViewModel>()
                        .Convert(service, accumulators);
            }
        }
    }
}