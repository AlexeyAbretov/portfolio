using Vendor.Core.Enums;
using Vendor.Interface.Data.Convergence;
using Vendor.Interface.Data.DPC;
using System;
using System.Collections.Generic;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Api.Converters.ItemConverters.Dpc
{
    /// <summary>
    /// Стратегия получения скоростных параметров для безлимитного продукта
    /// </summary>
    public class HomeDpcInternetUnlimetedSpeedStrategy : HomeDpcInternetSpeedStrategyBase
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
            return product.TariffType == InternetProductType.U.GetDescription() &&
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
                        Resources.HomeTariffs.InetSpeed,
                        string.Format(
                            Resources.HomeTariffs.InetSpeedToWithUnits,
                            speedIn))
                };
            }

            return new List<ParamApiViewModel>
            {
                CreateParam(
                    Resources.HomeTariffs.InetSpeedIn,
                    string.Format(
                        Resources.HomeTariffs.InetSpeedToWithUnits,
                        speedIn)),
                CreateParam(
                    Resources.HomeTariffs.InetSpeedOut,
                    string.Format(
                        Resources.HomeTariffs.InetSpeedToWithUnits,
                        speedOut)),
            };
        }
    }
}