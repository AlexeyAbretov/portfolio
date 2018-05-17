using Vendor.Travel.Interfaces;
using System;

namespace Vendor.Travel.Logic
{
    /// <summary>
    /// Предоставляет методы для работы с путешествием
    /// </summary>
    public class Travel : ITravel
    {
        private readonly ITravelCard[] _cards = null;

        /// <summary>
        /// Создает путешествие
        /// </summary>
        /// <param name="cards">Карточки путешествия</param>
        public Travel(ITravelCard[] cards)
        {
            _cards = cards ?? throw new ArgumentNullException(nameof(cards));
        }

        /// <summary>
        /// Возвращает путь путешествия
        /// </summary>
        /// <returns>Массив карточек путешествия</returns>
        /// <param name="sorter">Сортировщик карточек</param>
        /// <returns>Массив карточек путешествия</returns>
        public ITravelCard[] GetPath(ITravelCardSorter sorter)
        {
            if (sorter == null)
            {
                throw new ArgumentNullException(nameof(sorter));
            }

            return sorter.Sort(_cards);
        }
    }
}
