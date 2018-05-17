namespace Vendor.Travel.Interfaces
{
    /// <summary>
    /// Предоставляет контракт сортировки карточек путешествия
    /// </summary>
    public interface ITravelCardSorter
    {
        /// <summary>
        /// Сортирует путешествия
        /// </summary>
        /// <param name="cards">Список карточек</param>
        /// <returns>Список отсортированных карточек</returns>
        ITravelCard[] Sort(ITravelCard[] cards);
    }
}