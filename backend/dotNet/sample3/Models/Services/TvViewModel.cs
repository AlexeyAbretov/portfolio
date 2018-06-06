namespace Vendor.Client.WebApp.Models.HomeTariffs.Presets
{
    public class TvViewModel : FttbPresetServiceViewModel
    {
        /// <summary>
        /// Признак Tve
        /// </summary>
        public bool IsTve { get; set; }

        /// <summary>
        /// Кол-во каналов
        /// </summary>
        public int Channels { get; set; }

        /// <summary>
        /// Тв пакеты
        /// </summary>
        public FttbTvPacketViewModel[] Packets { get; set; }
    }
}