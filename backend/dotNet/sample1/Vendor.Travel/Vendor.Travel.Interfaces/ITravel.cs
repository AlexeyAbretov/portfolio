using Vendor.Travel.Interfaces;

namespace Vendor.Travel.Logic
{
    /// <summary>
    /// Контракт путешествия
    /// </summary>
    public interface ITravel
    {
        /// <summary>
        /// Возвращает путь путешествия
        /// </summary>
        /// <returns>Массив карточек путешествия</returns>
        /// <param name="sorter">Сортировщик карточек</param>
        /// <returns>Массив карточек путешествия</returns>
        ITravelCard[] GetPath(ITravelCardSorter sorter);
    }
}