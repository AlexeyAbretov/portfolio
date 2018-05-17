using Vendor.Core.Enums;
using Vendor.Interface.Data.Convergence;
using Vendor.Interface.Data.DPC;
using System.Collections.Generic;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Api.Converters.ItemConverters.Dpc
{
    /// <summary>
    /// Стратегия получения скоростных параметров для ночного продукта
    /// </summary>
    public class HomeDpcInternetNightSpeedStrategy : HomeDpcInternetSpeedStrategyBase
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
            return product.TariffType == InternetProductType.N.GetDescription() &&
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
                        Resources.HomeTariffs.InetSpeedDayNigth,
                        string.Format(
                            Resources.HomeTariffs.InetSpeedDayNightToWithUnits,
                            speedIn,
                            speedIn1))
                };
            }

            return new List<ParamApiViewModel>
            {
                CreateParam(
                    Resources.HomeTariffs.InetSpeedInDayNigth,
                    string.Format(
                        Resources.HomeTariffs.InetSpeedDayNightToWithUnits,
                        speedIn,
                        speedIn1)),
                CreateParam(
                    Resources.HomeTariffs.InetSpeedOutDayNigth,
                    string.Format(
                        Resources.HomeTariffs.InetSpeedDayNightToWithUnits,
                        speedOut,
                        speedOut1)),
            };
        }
    }
}