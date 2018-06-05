using Vendor.Client.WebApp.App_Core;
using Vendor.Interface.Data.USSS;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Presets.Converters
{
    public class StandaloneServiceConverterBase
    {
        /// <summary>
        /// Преобразует услуги вне инак пресетов
        /// </summary>
        /// <param name="service">Услуга</param>
        /// <returns></returns>
        public FttbServiceViewModel Convert(Service service)
        {
            var url = new UrlHelper(HttpContext.Current.Request.RequestContext);
            var action = GetAction(service);

            return new FttbServiceViewModel
            {
                Id = service.ServiceId,
                Name = service.Name,
                Type = (int)service.ServiceType,
                IsConnected = service.Connected ?? false,
                Fee = GetFee(service),
                Url = string.IsNullOrWhiteSpace(action) ?
                    string.Empty :
                    url.Action(
                        action,
                        new RouteValueDictionary()
                        {
                            {"ui-item", SitemapHelper.AuthorizedHomeCatalog}
                        })
            };
        }

        public virtual string GetAction(Service service)
        {
            return string.Empty;
        }

        public virtual decimal GetFee(Service service)
        {
            return service.Price ?? 0;
        }
    }
}