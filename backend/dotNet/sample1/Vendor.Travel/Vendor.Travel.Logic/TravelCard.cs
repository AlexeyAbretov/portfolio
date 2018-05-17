using Vendor.Travel.Interfaces;

namespace Vendor.TravelSorter
{
    /// <summary>
    /// Карточка путешествия
    /// </summary>
    public class TravelCard : ITravelCard
    {
        /// <summary>
        /// Пункт отправления
        /// </summary>
        public string From { get; set; }

        /// <summary>
        /// Пункт прибытия
        /// </summary>
        public string To { get; set; }

        /// <summary>
        /// Строковое представления карточки
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            return $"{From} > {To}";
        }
    }
}
