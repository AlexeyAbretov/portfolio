using Vendor.Core.Enums;
using Vendor.Interface.Data.Convergence;
using Vendor.Interface.Data.DPC;
using System.Collections.Generic;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Api.Converters.ItemConverters.Dpc
{
    /// <summary>
    /// Стратегия получения скоростных параметров для безлимитного продукта
    /// </summary>
    public class HomeDpcInternetLimitedSpeedStrategy : HomeDpcInternetSpeedStrategyBase
    {
        /// <summary>
        /// Признак возможности использования стратегии
        /// </summary>
        /// <param name="product">Продукт</param>
        /// <returns></returns>
        public override bool CanUse(
            InternetTariffDto product)
        {
            var (speedIn, speedOut, speedIn1, speedOut1, speedIn2, speedOut2) = GetSpeeds(product);
            return product.TariffType == InternetProductType.L.GetDescription() &&
                speedIn > 0 && speedOut > 0;
        }

        /// <summary>
        /// Получает параметры
        /// </summary>
        /// <param name="product">Продукт</param>
        /// <returns></returns>
        public override List<ParamApiViewModel> GetParameters(
            InternetTariffDto product)
        {
            var (speedIn, speedOut, speedIn1, speedOut1, speedIn2, speedOut2) = GetSpeeds(product);

            if (speedIn == speedOut)
            {
                return new List<ParamApiViewModel>
                {
                    CreateParam(
                        Resources.HomeTariffs.InetSpeedBeforeLimit,
                        $"{Resources.HomeTariffs.InetSpeed} {Resources.HomeTariffs.InetSpeedTo} {speedIn} {Resources.HomeTariffs.MbPerSecondUnits}"),
                    // todo: значение не описано trafficVolumeIn
                    CreateParam(
                        Resources.HomeTariffs.InetSpeedLimit,
                        string.Format(
                            Resources.HomeTariffs.GbTemplate,
                            0)),
                    // todo: значение не описано vPriceOut
                    CreateParam(
                        Resources.HomeTariffs.InetPriceMbAfterLimit,
                        "")
                };
            }

            return new List<ParamApiViewModel>
            {
                CreateParam(
                    Resources.HomeTariffs.InetSpeedBeforeLimit,
                    string.Format(
                        Resources.HomeTariffs.InetSpeedToWithUnits,
                        speedIn)),
                 CreateParam(
                    Resources.HomeTariffs.InetSpeedOutBeforeLimit,
                    string.Format(
                        Resources.HomeTariffs.InetSpeedToWithUnits,
                        speedOut)),
                // todo: значение не описано trafficVolumeIn
                CreateParam(
                    Resources.HomeTariffs.InetSpeedLimit,
                    string.Format(
                        Resources.HomeTariffs.GbTemplate,
                        0)),
                // todo: значение не описано vPriceOut
                CreateParam(
                    Resources.HomeTariffs.InetPriceMbAfterLimit,
                    "")
            };
        }
    }
}