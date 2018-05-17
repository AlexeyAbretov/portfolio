using Microsoft.VisualStudio.TestTools.UnitTesting;
using Vendor.Travel.Interfaces;
using Vendor.TravelSorter;
using System;

namespace Vendor.Travel.Logic.Tests
{
    [TestClass]
    public class TravelTests
    {
        [TestMethod]
        [ExpectedException(typeof(ArgumentNullException))]
        [Description("Проверяет путешествие со списком карточек == null")]
        public void TestTravelNullTravelCardsList()
        {
            new Travel(null);
        }

        [TestMethod]
        [ExpectedException(typeof(ArgumentNullException))]
        [Description("Проверяет путешествие c отсутвующим сортировщиком")]
        public void TestTravelGetPathNullSorter()
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

            new Travel(cards).GetPath(null);
        }

        [TestMethod]
        public void TestGetPathSuccess()
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

            var sorted = new Travel(cards).GetPath(new TravelCardSorter());

            var expected = "Point1 > Point2, Point2 > Point3, Point3 > Point4";
            var result = string.Join<ITravelCard>(", ", sorted);

            Assert.AreEqual(expected, result);
        }
    }
}
