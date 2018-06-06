using System;
using System.Collections.Generic;
using System.Linq;
using Vendor.Interface.Data.USSS;
using Vendor.Interface.Enums;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Presets.Converters
{
    public class TvConverter : ServiceConverterBase<TvViewModel>
    {
        public override TvViewModel Convert(
            Service service,
            List<AccumulatorsResponseViewModel> accumulators = null)
        {
            var result = base.Convert(service);

            result.Packets = GetPackets(service);
            result.Channels = GetChannels(service);

            result.IsTve = service.GetAdditionalParamValue(
                AdditionalParamNames.IsTve,
                false);

            return result;
        }

        /// <summary>
        /// Возвращает признак "Подарок" для услуги
        /// </summary>
        /// <param name="source">Услуга</param>
        /// <returns></returns>
        protected override bool HasGift(Service source)
        {
            return source?
                .PacketTypes?
                .Any(x => x.AccumulatorParams != null) ?? false;
        }

        /// <summary>
        /// Вовзращает пакеты
        /// </summary>
        /// <param name="source">Услуга</param>
        /// <returns></returns>
        protected virtual FttbTvPacketViewModel[] GetPackets(Service source)
        {
            return source.PacketTypes?
                .SelectMany(s => s.ChildPackets ?? new List<IptvPacket>())
                .SelectMany(s => s.ChildPackets ?? new List<IptvPacket>())
                .Select(ConvertPacket)
                .ToArray();
        }

        /// <summary>
        /// Преобразует тв пакеты
        /// </summary>
        /// <param name="source">Услуга</param>
        /// <returns></returns>
        protected virtual FttbTvPacketViewModel ConvertPacket(IptvPacket source)
        {
            if (!Enum.TryParse(
                source.SavePacketStatus,
                true,
                out SavePacketStatus saveStatus))
            {
                saveStatus = SavePacketStatus.Unknow;
            }

            return new FttbTvPacketViewModel
            {
                Id = source.PacketId,
                Name = source.Name,
                Channels = source.ChannelCount,
                IsObligatory = source.IsObligatory,
                IsPreSelected = source.IsPreSelected,
                Fee = source.Price ?? 0,
                Type = source.GetType(),
                DiscountType = source.AccumulatorParams?.DiscountType ??
                    AccumulatorDiscountType.None,
                Discount = source.AccumulatorParams?.Discount ?? 0,
                SaveStatus = saveStatus,
                IsConnected = source.Connected ?? false
            };
        }

        /// <summary>
        /// Вовзращает количество каналов (базовые)
        /// </summary>
        /// <param name="source">Услуга</param>
        /// <returns></returns>
        protected virtual int GetChannels(Service source)
        {
            // базовые
            return source.GetAdditionalParamValue(
                AdditionalParamNames.ChannelCount,
                0);
        }
    }
}