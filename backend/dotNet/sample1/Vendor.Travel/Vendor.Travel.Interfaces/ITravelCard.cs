namespace Vendor.Travel.Interfaces
{
    /// <summary>
    /// Карточка путешествия
    /// </summary>
    public interface ITravelCard
    {
        /// <summary>
        /// Пункт отправления
        /// </summary>
        string From { get; set; }

        /// <summary>
        /// Пункт прибытия
        /// </summary>
        string To { get; set; }
    }
}