using Microsoft.VisualStudio.TestTools.UnitTesting;
using Vendor.Travel.Interfaces;
using Vendor.TravelSorter;
using System;

namespace Vendor.Travel.Logic.Tests
{
    [TestClass]
    public class TravelSorterTests
    {
        [TestMethod]
        [ExpectedException(typeof(ArgumentNullException))]
        [Description("ѕровер€ет сортировку со списком карточек == null")]
        public void TestSortNullTravelCardsList()
        {
            new TravelCardSorter().Sort(null);
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentNullException))]
        [Description("ѕровер€ет сортировку со списком карточек == 0")]
        public void TestSortZeroLengthTravelCardsList()
        {
            new TravelCardSorter().Sort(new TravelCard[] { });
        }

        [TestMethod]
        [ExpectedException(typeof(ApplicationException))]
        [Description("ѕровер€ет сортировку без конкретной стартовой точки")]
        public void TestSortNoStartPoint()
        {
            new TravelCardSorter().Sort(new TravelCard[] {
                new TravelCard
                {
                    From = "Point1",
                    To = "Point1"
                }
            });
        }

        [TestMethod]
        public void TestSortSuccess()
        {
            var cards = new TravelCard[] {
                new TravelCard
                {
                    From = "Point2",
                    To = "Point3"
                },
                new TravelCard
                {
                    From = "Point1",
                    To = "Point2"
                },
                new TravelCard
                {
                    From = "Point3",
                    To = "Point4"
                }
            };

            var sorted = new TravelCardSorter().Sort(cards);

            var expected = "Point1 > Point2, Point2 > Point3, Point3 > Point4";
            var result = string.Join<ITravelCard>(", ", sorted);

            Assert.AreEqual(expected, result);
        }
    }
}
