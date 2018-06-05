namespace Vendor.Client.WebApp.Models.HomeTariffs.Presets
{
    /// <summary>
    /// информации по аккумуляторам.
    /// </summary>
    public class AccumulatorsResponseViewModel
    {
        /// <summary>
        /// Список сервисов, на которые будет происходить переключение
        /// </summary>
        public AccumulatorEntryViewModel[] Services { get; set; }

        /// <summary>
        /// Ид. аккумулятора
        /// </summary>
        public int Id { get; set; }
    }
}
