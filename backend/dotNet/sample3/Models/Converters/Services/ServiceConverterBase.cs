using Vendor.Client.WebApp.Models.Presets;
using Vendor.Interface.Data.USSS;
using Vendor.Interface.Enums;
using System.Collections.Generic;
using System.Linq;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Presets.Converters
{
    public class ServiceConverterBase<T> where T : FttbPresetServiceViewModel, new()
    {
        /// <summary>
        /// Преобразует данные об услуге инак-пресета из usss-объекта в объект для клиента
        /// </summary>
        /// <param name="service">Услуга</param>
        /// <returns></returns>
        public virtual T Convert(
            Service service,
            List<AccumulatorsResponseViewModel> accumulators = null)
        {
            var accId = service.GetAdditionalParamValue<int?>(
                AdditionalParamNames.AccId,
                null);

            var acc = accumulators?
                .FirstOrDefault(x => x.Id == accId)?
                .Services?
                .FirstOrDefault(x => x.ServiceId == service?.ServiceId);

            return new T
            {
                Id = service.ServiceIdExact,
                SplId = service.SplId,

                Name = service.Name,
                ShortDescription = service.ShortDescription,

                IsConnected = service.Connected ?? false,
                Fee = service.Price ?? 0,
                Discount = service.PsDiscount ?? 0,

                Type = service.ServiceType,
                IsRequired = service.PsSelected?.ToUpper() == PsSelected.M.ToString(),
                IsPreInclude = service.PsSelected?.ToUpper() == PsSelected.N.ToString(),
                IsAllow = service.PsSelected?.ToUpper() == PsSelected.A.ToString(),
                HasGift = HasGift(service),
                AccumulatorDiscountType = acc?.DiscountType ??
                    AccumulatorDiscountType.None,
                Accumulator = acc?.Discount ?? 0
            };
        }

        /// <summary>
        /// Возвращает признак "Подарок" для услуги
        /// </summary>
        /// <param name="source">Услуга</param>
        /// <returns></returns>
        protected virtual bool HasGift(Service source)
        {
            return !string.IsNullOrWhiteSpace(
                source?.GetAdditionalParamValue(
                    AdditionalParamNames.AccId,
                    string.Empty));
        }
    }
}