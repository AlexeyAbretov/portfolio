using Vendor.Travel.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Vendor.TravelSorter
{
    /// <summary>
    /// Предоставляет контракт сортировки карточек путешествия
    /// </summary>
    public class TravelCardSorter : ITravelCardSorter
    {
        /// <summary>
        /// Сортирует путешествия
        /// </summary>
        /// <param name="cards">Список карточек</param>
        /// <returns>Список отсортированных карточек</returns>
        public ITravelCard[] Sort(ITravelCard[] cards)
        {
            if (cards == null ||
                cards.Length == 0)
            {
                throw new ArgumentNullException(nameof(cards));
            }

            var first = cards.FirstOrDefault(
                x => !cards.Any(a => a.To == x.From));

            if (first == null)
            {
                throw new ApplicationException("The start point was not found.");
            }

            var result = new List<ITravelCard>(cards.Length);

            var next = first;

            while (next != null)
            {
                result.Add(next);
                next = cards.FirstOrDefault(
                    x => x.From == next.To
                );
            }

            return result.ToArray();
        }
    }
}
