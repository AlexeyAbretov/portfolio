using Vendor.Client.WebApp.Models.HomeTariffs.Api.Converters.ItemConverters.Dpc;
using Vendor.Core.Logger;
using Vendor.Interface.Data.Convergence;
using Vendor.Interface.Data.DPC;
using System.Collections.Generic;
using System.Linq;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Api.Converters
{
    /// <summary>
    /// Методы преобразования данных DPC в данные модели
    /// </summary>
    public class DpcHomeConverter : HomeConverterBase
    {
        /// <summary>
        /// Список конвертеров
        /// </summary>
        protected readonly Dictionary<int, HomeDpcItemConverterBase> _converters;

        /// <summary>
        /// Конструктов
        /// </summary>
        /// <param name="logger"></param>
        public DpcHomeConverter(ILogger logger) : base(logger)
        {
            // регистрируем конвертеры
            _converters = new Dictionary<int, HomeDpcItemConverterBase>
            {
                {
                    (int)ProductType.TvTariff,
                    new HomeDpcTvConverter()
                },
                {
                    (int)ProductType.InternetTariff,
                    new HomeDpcInternetConverter()
                },
                {
                    (int)ProductType.Bundle,
                    new HomeDpcKitConverter()
                },
                {
                    (int)ProductType.PhoneTariff,
                    new HomeDpcPhoneConverter()
                }
            };
        }

        /// <summary>
        /// Возвращает конвертор элемента по параметрам
        /// </summary>
        /// <param name="productType">Тип продукта</param>
        /// <returns></returns>
        protected virtual HomeDpcItemConverterBase GetItemConverter(
           int productType)
        {
            var converter = _converters.ContainsKey(productType) ?
                _converters[productType] :
                new HomeDpcItemConverterBase();

            return converter;
        }

        /// <summary>
        /// Преобразует список
        /// </summary>
        /// <param name="items">Список из DPC</param>
        /// <param name="supportServiceTitle">Название услуги "Техподдержка линии"</param>
        /// <returns></returns>
        public HomeTariffApiListViewModel ConvertList(
            List<InacProductBaseDto> items,
            string supportServiceTitle)
        {
            var result = GetDefaultTariffsViewModel();

            result.SupportServiceTitle = supportServiceTitle;

            var list = items?
                .Where(w => w != null)
                .Select(s => GetItemConverter(s.ProductType)
                    .ConvertListItem(s))
                .OrderBy(x => x.SortOrder)
                .ThenBy(x => x.Fee ?? 0)
                .ToList();

            result.List = list ?? new List<HomeTariffApiItemViewModel>();

            return result;
        }

        /// <summary>
        /// Преобразует продукт ТВ
        /// </summary>
        /// <param name="source">Продукт</param>
        /// <returns></returns>
        public HomeItemCardViewModel ConvertTvItem(InacProductBaseDto source)
        {
            var result = GetDefaultTvTariffViewModel();

            GetItemConverter(source.ProductType)
                .ConvertItem(source, result);

            return result;
        }

        /// <summary>
        /// Преобразует продукт Интернет
        /// </summary>
        /// <param name="source">Продукт</param>
        /// <returns></returns>
        public HomeItemCardViewModel ConvertInternetItem(InacProductBaseDto source)
        {
            var result = GetPreInitInternetTariff();

            // убираем, чтобы не добавлялся "мусор" в лигалы
            result.TextLegalTitleUnderParamsForInetCard = string.Empty;
            result.TextLegalUnderParamsForInetCard = string.Empty;

            GetItemConverter(source.ProductType)
                .ConvertItem(source, result);

            return result;
        }

        /// <summary>
        /// Преобразует продукт Бандл
        /// </summary>
        /// <param name="source">Продукт</param>
        /// <returns></returns>
        public HomeKitTariffViewModel ConvertKitItem(InacProductBaseDto source)
        {
            var result = GetPreInitKitModel();

            return result;
        }

        /// <summary>
        /// Преобразует продукт Телефон
        /// </summary>
        /// <param name="source">Продукт</param>
        /// <returns></returns>
        public HomePhoneTariffViewModel ConvertPhoneItem(InacProductBaseDto source)
        {
            var result = new HomePhoneTariffViewModel();

            return result;
        }
    }
}