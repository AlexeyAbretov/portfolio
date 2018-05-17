using Vendor.Core.Enums;
using Vendor.Interface.Data.Convergence;
using Vendor.Interface.Data.DPC;
using System.Collections.Generic;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Api.Converters.ItemConverters.Dpc
{
    /// <summary>
    /// Стратегия получения скоростных параметров для безлимитного продукта
    /// </summary>
    public class HomeDpcInternetReduceSpeedStrategy : HomeDpcInternetSpeedStrategyBase
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
            return (product.TariffType == InternetProductType.S.GetDescription() ||
                product.TariffType == InternetProductType.Shaped.GetDescription() ||
                product.TariffType == InternetProductType.ShapedMultiService.GetDescription()) &&
                speedIn > 0 && speedOut > 0 && speedIn1 > 0 && speedOut1 > 0;
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

            if (speedIn == speedOut && speedIn1 == speedOut1)
            {
                return new List<ParamApiViewModel>
                {
                    CreateParam(
                        Resources.HomeTariffs.InetSpeedBeforeLimit,
                        string.Format(
                            Resources.HomeTariffs.InetSpeedToWithUnits,
                            speedIn)),
                    // todo: значение не описано trafficVolumeIn
                    CreateParam(
                        Resources.HomeTariffs.InetSpeedLimit,
                        string.Format(
                            Resources.HomeTariffs.GbTemplate,
                            0)),
                    CreateParam(
                        Resources.HomeTariffs.InetSpeedAfterLimit,
                        string.Format(
                            Resources.HomeTariffs.InetSpeedToWithUnits,
                            speedIn1))
                };
            }

            return new List<ParamApiViewModel>
            {
                CreateParam(
                    Resources.HomeTariffs.InetSpeedInBeforeLimit,
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
                CreateParam(
                    Resources.HomeTariffs.InetSpeedInAfterLimit,
                    string.Format(
                        Resources.HomeTariffs.InetSpeedToWithUnits,
                        speedIn1)),
                CreateParam(
                    Resources.HomeTariffs.InetSpeedOutAfterLimit,
                    string.Format(
                        Resources.HomeTariffs.InetSpeedToWithUnits,
                        speedOut1)),
            };
        }
    }
}