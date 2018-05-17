using Vendor.Client.WebApp.Controllers.Home;
using Vendor.Core.Enums;
using Vendor.Interface.Data.Convergence;
using Vendor.Interface.Data.DPC;
using System.Collections.Generic;
using System.Linq;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Api.Converters.ItemConverters.Dpc
{
    /// <summary>
    /// Класс преобразования бандла из DPC
    /// </summary>
    public class HomeDpcKitConverter : HomeDpcItemConverterBase
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
                HomeCatalogPageController.ActionNameConstants.Kit,
                result.Alias);
            result.ProductType = Product.Kit.GetDescription();

            var tv = source.LinkedProducts?
                .FirstOrDefault(a => a.ProductType == (int)ProductType.TvTariff);
            result.HasTv = tv != null;

            var internet = source.LinkedProducts?
                .FirstOrDefault(a => a.ProductType == (int)ProductType.InternetTariff);
            result.HasInternet = internet != null;

            result.Params = (result.Params ?? new List<HomeTariffParamViewModel>())
                .Union(ConvertParams(
                    internet?.ProductParams) ?? new List<HomeTariffParamViewModel>())
                .ToList();

            if (result.HasInternet)
            {
                result.InternetServices = ConvertServices(
                    internet.LinkedProducts
                        .Where(x => x is FTTBServiceDto)
                        .Cast<FTTBServiceDto>()
                        .ToArray());
            }

            // todo: нужно делать для DPC?
            result.HasPhone = false;

            result.TvAliasInKit = tv?.Id.ToString();

            result.ChannelCount = HomeDpcTvConverter.GetChannelsCount(
                tv?.LinkedProducts);

            return result;
        }

        public override void ConvertItem(InacProductBaseDto source, HomeItemCardViewModel model)
        {
            base.ConvertItem(source, model);
        }
    }
}