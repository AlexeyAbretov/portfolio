using Vendor.Client.WebApp.Controllers.Home;
using Vendor.Core.Enums;
using Vendor.Interface.Data.Convergence;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Api.Converters.ItemConverters.Dpc
{
    /// <summary>
    /// Класс преобразования тарифа телефона из DPC
    /// </summary>
    public class HomeDpcPhoneConverter : HomeDpcItemConverterBase
    {
        /// <summary>
        /// Преобразует элемент списка продуктов
        /// </summary>
        /// <param name="source">Продукт</param>
        /// <returns></returns>
        public override HomeTariffApiItemViewModel ConvertListItem(
            InacProductBaseDto source)
        {
            var result = base.ConvertListItem(source);

            result.Url = HomeConverterBase.GetUrl(
                HomeCatalogPageController.ActionNameConstants.Phone,
                result.Alias);
            result.ProductType = Product.Phone.GetDescription();

            return result;
        }
    }
}