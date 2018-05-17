using Vendor.Client.WebApp.App_Core;
using Vendor.Client.WebApp.Controllers;
using Vendor.Client.WebApp.Models.HomeTariffs.ListTariff;
using Vendor.Core.Enums;
using Vendor.Core.Logger;
using Vendor.Infrastructure;
using Vendor.Interface.Data.Dictionary;
using Vendor.Interface.Data.Equipment;
using Vendor.Interface.Data.HomeTariffs;
using Vendor.Interface.Data.HomeTariffs.Bill;
using Vendor.Interface.Data.USSS;
using Vendor.Interface.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Api.Converters
{
    /// <summary>
    /// Методы преобразования данных QP в данные модели
    /// </summary>
    public class QpHomeConverter : HomeConverterBase
    {
        /// <summary>
        /// Конструктор
        /// </summary>
        /// <param name="logger"></param>
        public QpHomeConverter(ILogger logger) : base(logger)
        {
        }

        /// <summary>
        /// Преобразует список
        /// </summary>
        /// <param name="items">Список из QP</param>
        /// <param name="supportServiceTitle">Название услуги "Техподдержка линии"</param>
        /// <param name="deviceTypes">Типы устройств</param>
        /// <param name="regionId">Регион</param>
        /// <returns></returns>
        public HomeTariffApiListViewModel ConvertList(
            List<TariffViewModel> items,
            string supportServiceTitle,
            List<DeviceTypeDto> deviceTypes,
            int regionId)
        {
            var result = GetDefaultTariffsViewModel();

            List<HomeTariffApiItemViewModel> list = null;
            list = items?
                .Select(s => ConvertItem(s, items, regionId))
                .OrderBy(x => x.SortOrder)
                .ToList();

            result.SupportServiceTitle = supportServiceTitle;

            result.List = list ?? new List<HomeTariffApiItemViewModel>();

            if (deviceTypes != null)
            {
                var sortedTypes = new List<HomeTariffProductTypeViewModel>();

                var type = deviceTypes.FirstOrDefault(
                    x => x.Id == AppConfiguration.InternetProductId);

                if (type != null)
                {
                    sortedTypes.Add(new HomeTariffProductTypeViewModel
                    {
                        Title = type.Title,
                        Alias = Product.Internet.GetDescription(),
                        SortOrder = type.SortOrder.GetValueOrDefault(0)
                    });
                }

                type = deviceTypes.FirstOrDefault(
                    x => x.Id == AppConfiguration.TvProductId);

                if (type != null)
                {
                    sortedTypes.Add(new HomeTariffProductTypeViewModel
                    {
                        Title = type.Title,
                        Alias = Product.Tv.GetDescription(),
                        SortOrder = type.SortOrder.GetValueOrDefault(0)
                    });
                }

                type = deviceTypes.FirstOrDefault(
                   x => x.Id == AppConfiguration.PhoneProductId);

                if (type != null)
                {
                    sortedTypes.Add(new HomeTariffProductTypeViewModel
                    {
                        Title = type.Title,
                        Alias = Product.Phone.GetDescription(),
                        SortOrder = type.SortOrder.GetValueOrDefault(0)
                    });
                }

                result.ProductTypes = sortedTypes;
            }

            return result;
        }

        /// <summary>
        /// Преобразует тариф из QP
        /// </summary>
        /// <param name="source">Тариф</param>
        /// <param name="items">Все тарифы</param>
        /// <param name="regionId">Регион</param>
        /// <returns></returns>
        public HomeTariffApiItemViewModel ConvertItem(
            TariffViewModel source,
            List<TariffViewModel> items,
            int regionId)
        {
            bool tvInBundle = items
                .Any(a => a.TvPackageIds != null &&
                    a.TvPackageIds
                        .Any(x => x == source.MarketingId) &&
                   a.ProductType == Product.Kit
                );
            bool inetInBundle = items
                .Any(x => x.ServiceType == ServiceTypeEnum.BUNDLE &&
                    x.BundleProducts != null &&
                    x.BundleProducts
                        .Any(a => a.Id == source.Id));

            var result = new HomeTariffApiItemViewModel
            {
                Id = source.MarketingId.ToString(),
                Alias = source.Alias,
                Title = source.Title,
                Url = GetUrl(source),
                RequestUrl = GetRequestUrl(source.Alias),
                IsTvOnly = source.IsTariff && !tvInBundle && source.ProductType == Product.Tv,
                IsInetOnly = source.IsTariff && !inetInBundle && source.ProductType == Product.Internet,
                IsSucceeded = true,
                PromoBenefit = source.PromoBenefit,
                Benefit = source.Benefit,
                IsConnectionCheckable = source.IsConnectionCheckable,
                IsArchive = source.IsArchive,
                SortOrder = source.SortOrder ?? 0
            };

            if (source.HasTariffParams)
            {
                var speed = source.TariffParams
                    .FirstOrDefault(x => x.AdditionalValue != null);

                if (speed != null)
                {
                    result.InternetSpeed = speed.Value;
                }

                result.Params = source.TariffParams?
                    .Select(s => ParamsConverter(s))
                    .ToList();
            }

            result.ChannelsCountReplacement = source.ChannelsCountReplacement;
            result.ChannelCount = source.ChannelCount;
            result.ProductType = source.ProductType.GetDescription();
            result.FamilyTitle = source.FamilyDetails != null ?
                source.FamilyDetails.Title :
                string.Empty;
            result.FamilyId = source.FamilyDetails != null ?
                (int?)source.FamilyDetails.Id :
                null;

            if (source.ProductType == Product.Tv)
            {
                result.HasTv = true;
            }
            else if (source.ProductType == Product.Kit)
            {
                result.HasTv = source.HasTvPackages;

                result.HasInternet = source.HasInternetTariff;

                if (result.HasInternet)
                {
                    var internet = new InternetTariffModel().GetViewModel(
                        source.InternetTariffId.GetValueOrDefault(0),
                        regionId);

                    if (internet != null)
                    {
                        result.InternetServices = ServiceConverter(
                            internet.TariffServices, string.Empty);

                        result.InternetTariffAlias = internet.Alias;
                    }
                }

                result.HasPhone = source.HasPhoneTariff;

                result.TvAliasInKit = source.TvTariffAlias;
            }

            result.Fee = source.ItemFee != null ? source.ItemFee : source.SubscriptionFee;

            result.PktMinCount = source.PktMinCount;
            result.ThematicPackages = source.ThematicPackages?
                .Select(t => t.Title)
                .ToArray();
            result.ThematicPackagesString = String.Join(
                ", ",
                source.ThematicPackages?
                    .Select(t => t.Title)
                    .ToArray() ?? new string[] { });

            result.TariffServices = ServiceConverter(
                source.TariffServices, GetServicePrefix());

            return result;
        }

        /// <summary>
        /// Преобразует параметры
        /// </summary>
        /// <param name="source">Параметр</param>
        /// <returns></returns>
        protected virtual HomeTariffParamViewModel ParamsConverter(
            TariffParamViewModel source)
        {
            if (source == null)
            {
                return null;
            }

            return new HomeTariffParamViewModel
            {
                SortOrder = source.SortOrder.GetValueOrDefault(0),
                Text = source.Text,
                Unit = source.Unit,
                Value = source.Value,
                ShowInTile = source.ShowInTile,
                AdditionalValue = source.AdditionalValue,
                Id = source.Id
            };
        }

        /// <summary>
        /// Преобразует услуги
        /// </summary>
        /// <param name="services">Услуги</param>
        /// <param name="prefix">Префикс услуги</param>
        /// <returns></returns>
        protected virtual TariffService[] ServiceConverter(
            ParamViewModel[] services,
            string prefix)
        {
            return services?
                .Select(s => new TariffService
                {
                    Id = s.Id.ToString(),
                    Alias = s.Alias,
                    Title = s.Text,
                    Price = s.Price,
                    Fee = s.SubscriptionFee,
                    ProductType = Product.Service.GetDescription(),
                    Type = s.ServiceType,
                    Prefix = prefix,
                    BackgroundImageUrl = s.BackgroundImage,
                    NewCatalogImageUrl = s.NewCatalogImage,
                    Benefit = s.Benefit,
                    NewCatalogDescription = s.NewCatalogDescription,
                    SortOrder = s.SortOrderExact,
                    State = s.IsRequired ?
                        TvPackageServiceState.Required.GetDescription() :
                        (s.IncludedByDefault ?
                            TvPackageServiceState.Default.GetDescription() :
                            TvPackageServiceState.Off.GetDescription()),
                    Description = s.Description,
                    IncludeFeeInTotal = !s.IgnoreService
                })
                .ToArray();
        }

        /// <summary>
        /// Возвращает ссылку на тариф
        /// </summary>
        /// <param name="source">Тариф</param>
        /// <returns></returns>
        protected virtual string GetUrl(TariffViewModel source)
        {
            return GetUrl(source.ActionName, source.Alias);
        }

        /// <summary>
        /// Преобразует тв-тариф
        /// </summary>
        /// <param name="source">Тариф</param>
        /// <param name="items">Все тарифы</param>
        /// <param name="supportService">Название услуги "Техподдержка линии"</param>
        /// <param name="legals">Лигалы</param>
        /// <returns></returns>
        public HomeItemCardViewModel ConvertTvItem(
            TvViewModel source,
            HomeTariffApiListViewModel items,
            ServiceMarketingItem supportService,
            List<LegalItemViewModel> legals)
        {
            var result = GetDefaultTvTariffViewModel();
            result.Tariffs = items;

            TvConverter(source, result, items, supportService, legals);

            return result;
        }

        /// <summary>
        /// Преобразует тв-тариф
        /// </summary>
        /// <param name="source">Тариф</param>
        /// <param name="result">Результирующая модель</param>
        /// <param name="items">Все тарифы</param>
        /// <param name="supportService">Название услуги "Техподдержка линии"</param>
        /// <param name="legals">Лигалы</param>
        protected virtual void TvConverter(
            TvViewModel source,
            HomeTvTariffViewModel result,
            HomeTariffApiListViewModel items,
            ServiceMarketingItem supportService,
            List<LegalItemViewModel> legals)
        {
            result.Id = source.Id.ToString();
            result.Alias = source.Alias;
            result.ChannelsNumberCommentInTile = source.ChannelsNumberCommentInTile;
            result.Fee = source.Fee?.Fee;
            result.Price = source.Price;
            result.Title = source.Title;
            result.TitleFormat = source.TitleFormat;
            result.IsArchive = source.IsArchive;
            result.ArchiveNote = SiteTextUtils.GetSiteText(
                TextTitles.NEW_SHPD_CATALOG_ARCHIVE_TEXT);

            result.IsConnectionCheckable =
                (items?.List?
                    .FirstOrDefault(x => x.Alias == source.Alias)?
                    .IsConnectionCheckable)
                    .GetValueOrDefault(false);

            if (!result.IsConnectionCheckable)
            {
                result.ConnectButtonTitle = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_CARD_CONNECT_BUTTON_TEXT_FOR_INTERNET_LITE);

                result.ConnectButtonUrl = ClientUtils.GetQpSettings(
                    SettingTitles.NEW_SHPD_CATALOG_CARD_CONNECT_BUTTON_LINK_FOR_INTERNET_LITE);
            }

            result.RequestUrl = GetRequestUrl(null);

            result.IsTvOnly = (items?.List?
                .FirstOrDefault(a => a.Alias == source.Alias)?.IsTvOnly)
                .GetValueOrDefault(false);

            result.SupportService = supportService == null ? null : new TariffService
            {
                Alias = supportService.Alias,
                Id = supportService.Id.ToString(),
                Title = supportService.Title,
                Fee = supportService.Fee?.Fee,
                ProductType = Product.Service.GetDescription(),
                Type = ServiceType.Support.GetDescription(),
                Benefit = supportService.Benefit,
                State = TvPackageServiceState.Default.GetDescription(),
                Description = supportService.Description,
                NewCatalogImageUrl = supportService.NewCatalogImage,
                IncludeFeeInTotal = !supportService.IgnoreService
            };

            result.ChannelsCountReplacement = source.ChannelsCountReplacement;
            result.ChannelCount = source.ChannelCount;
            result.BaseChannels = source.ChannelsGrid?.PlainChannels?
                .OrderBy(o => o.TopOrder)
                .Select(s => new TvChannel
                {
                    Id = s.Id.ToString(),
                    Title = s.Title,
                    IconUrl = s.SmallLogoUrl,
                    Description = s.Description
                })
                .ToArray();

            result.MinPackagesFeeReplacement = source.MinPackagesFeeReplacement;

            result.Services = ServiceConverter(
                source.TariffServices,
                GetServicePrefix());

            if (source.MobileTvPackage != null)
            {
                result.MobileTvPackage = new MobileTvViewModel
                {
                    Title = source.MobileTvPackage.Title,
                    Id = source.MobileTvPackage.Id.ToString(),
                    Description = source.MobileTvPackage.Description,
                    ProductType = Product.MobileTv.GetDescription(),
                    ChannelsCountString = source.MobileTvPackage.ChannelsCountString,
                    GiftText = SiteTextUtils.GetSiteText(
                        TextTitles.NEW_SHPD_CATALOG_GIFT_TEXT),
                    GiftIconUrl = SiteTextUtils.GetSiteText(
                        TextTitles.NEW_SHPD_CATALOG_GIFT_ICON_URL),

                    StaticText = SiteTextUtils.GetSiteText(
                        TextTitles.NEW_SHPD_CATALOG_TV_STATIC_TEXT),
                    DescriptionNote = SiteTextUtils.GetSiteText(
                        TextTitles.NEW_SHPD_CATALOG_TV_TEXT),

                    Channels = source.MobileTvPackage.Themes?
                        .SelectMany(s => s.Channels)
                        .OrderBy(o => o.TopOrder)
                        .Select(s => new TvChannel
                        {
                            Id = s.Id.ToString(),
                            Title = s.Title,
                            IconUrl = s.SmallLogoUrl,
                            Description = s.Description
                        })
                        .GroupBy(x => x.Id)
                        .Select(s => s.First())
                        .ToArray()
                };
            }

            result.PktMinCount = source.PktMinCount;
            result.ThematicPackages = source.ThematicPackages?
                .OrderBy(o => o.SortOrder ?? 0)
                .Select(s => new TvPackage
                {
                    ProductType = Product.None.GetDescription(),
                    Alias = s.Alias,
                    Title = s.Title,
                    Fee = s.Fee,
                    Price = s.Price,
                    Description = s.Description,
                    Id = s.Id.ToString(),
                    SortOrder = s.SortOrder ?? 0,
                    Channels = s.ChannelsGrid?.PlainChannels?
                        .OrderBy(o => o.TopOrder)
                        .Select(x => new TvChannel
                        {
                            Id = x.Id.ToString(),
                            Title = x.Title,
                            IconUrl = x.SmallLogoUrl,
                            Description = x.Description
                        })
                        .ToArray(),

                    IsRequired = s.IsRequired.GetValueOrDefault(false),
                    PromoFee = s.PromoFee,
                    Promo = s.Promo
                })
                .ToArray();

            result.ThematicPackagesString = String.Join(
               ", ",
               result.ThematicPackages?
                   .Select(t => t.Title)
                   .ToArray() ?? new string[] { });

            result.AdvancedPackages = source.AdvancedPackages?
                .OrderBy(o => o.SortOrder ?? 0)
                .Select(s => new TvPackage
                {
                    ProductType = Product.None.GetDescription(),
                    Alias = s.Alias,
                    Title = s.Title,
                    Fee = s.Fee,
                    Price = s.Price,
                    Description = s.Description,
                    Id = s.Id.ToString(),
                    SortOrder = s.SortOrder ?? 0,
                    Channels = s.ChannelsGrid?.PlainChannels?
                        .OrderBy(o => o.TopOrder)
                        .Select(x => new TvChannel
                        {
                            Id = x.Id.ToString(),
                            Title = x.Title,
                            IconUrl = x.SmallLogoUrl,
                            Description = x.Description
                        })
                        .ToArray(),

                    IsRequired = s.IsRequired.GetValueOrDefault(false),
                    PromoFee = s.PromoFee,
                    Promo = s.Promo
                })
                .ToArray();

            result.Legals = new Legals
            {
                ServiceTitleTemplate = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_SERVICE_LEGAL_TITLE),
            };

            // лигалы ТВ
            result.Legals.List.AddRange(legals ?? new List<LegalItemViewModel>());
            result.IsAuthLegal = false;

            //Выбор первого лигала как включенного
            if (result.Legals.List.Count > 0 &&
                !result.Legals.List.Any(x => x.IsChecked))
            {
                result.Legals.List[0].IsChecked = true;
            }

            if (Features.NewHomeTvAndKitGrouping)
            {
                bool hasCustomGroups = false;

                if (source.TvMarketingPackageCustomGroups != null)
                {
                    hasCustomGroups = source.TvMarketingPackageCustomGroups
                        .Any(a => source.AdvancedPackages.Any(x => x.Id == a.PackageId));

                    if (!hasCustomGroups)
                    {
                        hasCustomGroups = source.TvMarketingPackageCustomGroups
                            .Any(a => source.ThematicPackages.Any(x => x.Id == a.PackageId));
                    }
                }

                if (source.TvRegionalPackageCustomGroups != null && !hasCustomGroups)
                {
                    hasCustomGroups = source.TvRegionalPackageCustomGroups
                        .Any(a => source.AdvancedPackages.Any(x => x.Id == a.PackageId));

                    if (!hasCustomGroups)
                    {
                        hasCustomGroups = source.TvRegionalPackageCustomGroups
                            .Any(a => source.ThematicPackages.Any(x => x.Id == a.PackageId));
                    }
                }

                if (hasCustomGroups)
                {
                    var rawGroups = source.TvMarketingPackageCustomGroups ?? (new TVPackageGroup[] { });

                    rawGroups = rawGroups
                        .Union(source.TvRegionalPackageCustomGroups ?? (new TVPackageGroup[] { }))
                        .ToArray();

                    rawGroups
                        .ToList()
                        .ForEach(e =>
                        {
                            var package = result.AdvancedPackages
                                .FirstOrDefault(x => x.Id == e.PackageId.ToString());
                            if (package == null)
                            {
                                package = result.ThematicPackages
                                    .FirstOrDefault(x => x.Id == e.PackageId.ToString());
                            }

                            e.PackageSortOrder = package.SortOrder;
                        });


                    var groups = rawGroups
                        .OrderBy(o => o.SortOrder)
                        .ThenBy(o => o.Title)
                        .ThenBy(o => o.PackageSortOrder)
                        .GroupBy(g => g.Alias);

                    result.CustomGroups = groups;
                }
            }
        }

        /// <summary>
        /// Преобразует интернет-тариф
        /// </summary>
        /// <param name="source">Тариф</param>
        /// <param name="items">Все тарифы</param>
        /// <param name="equipments">Оборудование</param>
        /// <param name="legals">Лигалы</param>
        /// <param name="isAuthLegals">Если на тарифе Инет бандла, полученном ранее, старый лигал - тут тоже должне быть старый</param>
        /// <returns></returns>
        public HomeItemCardViewModel ConvertInternetItem(
            HomeTariffViewModel source,
            HomeTariffApiListViewModel items,
            List<EquipmentDto> equipments,
            List<LegalItemViewModel> legals,
            bool isAuthLegals)
        {
            var result = GetPreInitInternetTariff();

            InternetConverter(
                source,
                result,
                items,
                equipments,
                legals,
                isAuthLegals);

            result.Tariffs = items;

            return result;
        }

        /// <summary>
        /// Преобразует интернет-тариф
        /// </summary>
        /// <param name="source">Тариф</param>
        /// <param name="result">Результирующая модель</param>
        /// <param name="items">Все тарифы</param>
        /// <param name="equipments">Оборудование</param>
        /// <param name="legals">Лигалы</param>
        /// <param name="isAuthLegals">Если на тарифе Инет бандла, полученном ранее, старый лигал - тут тоже должне быть старый</param>
        protected virtual void InternetConverter(
            HomeTariffViewModel source,
            HomeInternetTariffViewModel result,
            HomeTariffApiListViewModel items,
            List<EquipmentDto> equipments,
            List<LegalItemViewModel> legals,
            bool isAuthLegals)
        {
            result.Id = source.Id.ToString();
            result.Alias = source.Alias;
            result.Fee = source.Fee?.Fee;
            result.Title = source.Title;
            result.TitleFormat = source.TitleFormat;
            result.InternetParamsGroups = source.ParamGroups
                .Select(x => new ParamGroupApiViewModel(
                    x, source.MainParam?.Id)).ToList();
            result.IsArchive = source.IsArchive;
            result.ArchiveNote = SiteTextUtils.GetSiteText(
                TextTitles.NEW_SHPD_CATALOG_ARCHIVE_TEXT);

            result.ProductType = Product.Internet.GetDescription();

            //Выбор скорости
            var vsu = source.ParamGroups
                .SelectMany(x => x.Parameters)
                .FirstOrDefault(x => x.Id > 0 && x.SpeedGroup != null);
            if (vsu != null)
            {
                result.SpeedChooser = vsu.SpeedGroup;
            }

            var prefix = GetServicePrefix();

            result.IsNotFixTariffCategory = source.Categories.Any(x => x.CheckConnectionAvailable);

            result.IsConnectionCheckable =
                 (items?.List?
                     .FirstOrDefault(x => x.Alias == source.Alias)?
                     .IsConnectionCheckable)
                     .GetValueOrDefault(false);

            //Сначала добавляем все семейства
            var services = source.TariffServices?
                .Where(x => x.FamilyId.HasValue)
                .GroupBy(
                    x => x.FamilyId,
                    x => x,
                    (key, group) => new ServiceApiViewModel(
                        group.FirstOrDefault(),
                        prefix,
                        group.Any(a => a.Childs != null) ?
                            group
                                .Where(x => x.Childs != null)
                                .SelectMany(a => a.Childs)
                                .ToArray() :
                            null,
                        equipments: equipments))
            //теперь отдельные элементы
                .Union(
                    source.TariffServices?
                        .Where(x => !x.FamilyId.HasValue)
                        .Select(x => new ServiceApiViewModel(x, prefix, equipments: equipments)))
                .ToList();

            //Отдельно добавляется услуга Выбор Скорости
            if (result.SpeedChooser != null)
            {
                services.Add(new ServiceApiViewModel
                {
                    BackgroundImageUrl = result.SpeedChooser.Services
                        .OrderBy(x => x.SortOrder)
                        .FirstOrDefault(x => !string.IsNullOrEmpty(x.BackgroundImage))?.BackgroundImage,
                    NewCatalogImageUrl = result.SpeedChooser.Services
                        .OrderBy(x => x.SortOrder)
                        .FirstOrDefault(x => !string.IsNullOrEmpty(x.NewCatalogImage))?.NewCatalogImage,
                    Id = result.SpeedChooser.Id.ToString(),
                    Title = SiteTextUtils.GetSiteText(TextTitles.NEW_SHPD_CATALOG_VSU_TITLE),
                    Benefit = SpeedChooserReplaces(TextTitles.NEW_SHPD_CATALOG_VSU_BENEFIT, result.SpeedChooser),
                    Fee = (double?)result.SpeedChooser.MinVsuFee(),
                    Description = SpeedChooserReplaces(TextTitles.NEW_SHPD_CATALOG_VSU_DESCRIPTION, result.SpeedChooser),
                    ProductType = Product.Service.GetDescription(),
                    State = TvPackageServiceState.Off.GetDescription(),
                    Type = ServiceType.ChooseSpeed.GetDescription(),
                    SortOrder = result.SpeedChooser.Services.Min(x => x.SortOrderExact),
                    Notes = SiteTextUtils.GetSiteText(TextTitles.NEW_SHPD_CATALOG_VSU_TEXT),
                    NewCatalogDescription = result.SpeedChooser.Services
                        .OrderBy(x => x.SortOrder)
                        .FirstOrDefault(x => !string.IsNullOrEmpty(x.NewCatalogDescription))?.NewCatalogDescription
                });
            }

            result.InternetServices = services.ToArray();

            result.Legals = new Legals
            {
                ServiceTitleTemplate = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_LEGAL_SERVICES),
            };

            result.Legals.List.AddRange(legals ?? new List<LegalItemViewModel>());
            result.IsAuthLegal = isAuthLegals;

            //Выбор первого лигала как включенного
            if (!(result?.Legals?.List?.Any(x => x.IsChecked)).GetValueOrDefault(false))
            {
                result.Legals.List[0].IsChecked = true;
            }

            result.ConnectButtonTitle = SiteTextUtils.GetSiteText(result.IsNotFixTariffCategory ?
                TextTitles.NEW_SHPD_CATALOG_CARD_CONNECT_BUTTON_TEXT :
                TextTitles.NEW_SHPD_CATALOG_CARD_CONNECT_BUTTON_TEXT_FOR_INTERNET_LITE);
            result.ConnectButtonUrl =
                ClientUtils.GetQpSettings(result.IsNotFixTariffCategory ?
                SettingTitles.NEW_SHPD_CATALOG_CARD_CONNECT_BUTTON_LINK :
                SettingTitles.NEW_SHPD_CATALOG_CARD_CONNECT_BUTTON_LINK_FOR_INTERNET_LITE);

            result.SelectedRouterPrefix =
                SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_SELECTED_ROUTER_TEXT);
        }

        /// <summary>
        /// Преобразует бандл
        /// </summary>
        /// <param name="source">Бандл</param>
        /// <param name="items">Все тарифы</param>
        /// <param name="inet">Интернет-тариф</param>
        /// <param name="tv">Тв-тариф</param>
        /// <param name="legals">Лигалы</param>
        /// <param name="isAuthLegals">Если на тарифе Инет бандла, полученном ранее, старый лигал - тут тоже должне быть старый</param>
        /// <returns></returns>
        public HomeKitTariffViewModel ConvertKitItem(
            KitViewModel source,
            HomeTariffApiListViewModel items,
            HomeInternetTariffViewModel inet,
            HomeTvTariffViewModel tv,
            List<LegalItemViewModel> legals,
            bool isAuthLegals)
        {
            var result = GetPreInitKitModel();

            KitConverter(
                source,
                result,
                items,
                legals,
                inet,
                tv,
                isAuthLegals);

            result.Tariffs = items;

            return result;
        }

        /// <summary>
        /// Преобразует бандл
        /// </summary>
        /// <param name="source">Бандл</param>
        /// <param name="result">Результирующая модель</param>
        /// <param name="regionId">Регион</param>
        /// <param name="items">Все тарифы</param>
        /// <param name="forceOldLegals">Если на тарифе Инет бандла, полученном ранее, старый лигал - тут тоже должне быть старый</param>
        protected virtual void KitConverter(
            KitViewModel source,
            HomeKitTariffViewModel result,
            HomeTariffApiListViewModel items,
            List<LegalItemViewModel> legals,
            HomeInternetTariffViewModel inet,
            HomeTvTariffViewModel tv,
            bool isAuthLegals)
        {
            result.Id = source.Id.ToString();
            result.Alias = source.Alias;
            result.Fee = source.Fee?.Fee;
            result.Title = source.Title;
            result.TitleFormat = source.TitleFormat;
            result.IsArchive = source.IsArchive;
            result.ArchiveNote = SiteTextUtils.GetSiteText(
                TextTitles.NEW_SHPD_CATALOG_ARCHIVE_TEXT);

            result.BundleParamsGroups = source.ParamGroups
                .Select(x => new ParamGroupApiViewModel(x, source.MainParam?.Id))
                .ToList();

            result.IsConnectionCheckable =
                (items?.List?
                    .FirstOrDefault(x => x.Alias == source.Alias)?
                    .IsConnectionCheckable)
                    .GetValueOrDefault(false);

            var prefix = GetServicePrefix();

            result.ProductType = Product.Kit.GetDescription();

            result.IsNotFixTariffCategory = source.Categories.Any(x => x.CheckConnectionAvailable);

            //Сначала добавляем все семейства
            var services = source.TariffServices?
                .Where(x => x.FamilyId.HasValue)
                .GroupBy(
                    x => x.FamilyId,
                    x => x,
                    (key, group) => new ServiceApiViewModel(
                        group.FirstOrDefault(),
                        prefix,
                        group.Any(a => a.Childs != null) ?
                            group
                            .Where(x => x.Childs != null)
                            .SelectMany(a => a.Childs)
                            .ToArray() :
                        null,
                        true))
                //теперь отдельные элементы
                .Union(
                    source.TariffServices?
                        .Where(x => !x.FamilyId.HasValue)
                        .Select(x => new ServiceApiViewModel(x, prefix, isInBundle: true))
                );

            result.BundleServices = services.ToArray();

            result.BundleServicesParams = new Dictionary<int, ParamApiViewModel[]>();

            foreach (var item in source.KitMembers
                .Where(x => x.Items != null)
                .SelectMany(x => x.Items)
                .Where(x => x.ProductId == 0))
            {
                var pars = new List<ParamApiViewModel>();
                foreach (var gr in item.GetItemParametersGroups())
                {
                    pars.AddRange(gr.Params.Where(x => x.Id > 0)
                        .Select(x => new ParamApiViewModel
                        {
                            Id = x.Id,
                            Text = x.Text,
                            Value = x.Value,
                            AdditionalValue = x.AdditionalValue,
                            SortOrder = x.SortOrder.GetValueOrDefault(0),
                            GroupId = gr.Id
                        }));
                }
                if (pars.Count > 0)
                {
                    result.BundleServicesParams.Add(item.Id, pars.ToArray());
                }
            }

            result.Legals = new Legals
            {
                ServiceTitleTemplate = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_LEGAL_SERVICES),
            };

            result.Legals.List.AddRange(legals ?? new List<LegalItemViewModel>());
            result.IsAuthLegal = isAuthLegals;

            if (inet.SpeedChooser != null)
            {
                result.SpeedChooser = inet.SpeedChooser;
            }

            result.ConnectButtonTitle = SiteTextUtils.GetSiteText(result.IsNotFixTariffCategory ?
                TextTitles.NEW_SHPD_CATALOG_CARD_CONNECT_BUTTON_TEXT :
                TextTitles.NEW_SHPD_CATALOG_CARD_CONNECT_BUTTON_TEXT_FOR_INTERNET_LITE);
            result.ConnectButtonUrl = ClientUtils.GetQpSettings(result.IsNotFixTariffCategory ?
                SettingTitles.NEW_SHPD_CATALOG_CARD_CONNECT_BUTTON_LINK :
                SettingTitles.NEW_SHPD_CATALOG_CARD_CONNECT_BUTTON_LINK_FOR_INTERNET_LITE);

            result.InternetParamsGroups = inet.InternetParamsGroups;

            #region Заполнение сервисов Интернет-тарифа (исключаются те, которые также есть на бандле)

            //Необходимо убрать сервисы, доступные на интернет тарифе, если есть такие же на бандле, т.к. бандл имеет больший приоритет (устно Виталик)
            if (result.BundleServices != null && result.BundleServices.Length > 0)
            {
                var inetServices = new List<ServiceApiViewModel>();
                //идентификаторы сервисов (не семейств, т.к. для бандлов не отображаются семейства)
                var bundleServicesIds = result.BundleServices
                    .Where(x => x.IsFamily)
                    .SelectMany(x => x.Childs
                        .Select(a => a.Id))
                    .Union(result.BundleServices
                        .Where(x => !x.IsFamily)
                        .Select(x => x.Id));

                foreach (var item in inet.InternetServices)
                {
                    if (item.IsFamily) //семейство => берем тех детей, кто не встречается у бандла
                    {
                        var childs = item.Childs
                            .Where(x => !bundleServicesIds.Any(a => a == x.Id))
                            .ToList();

                        if (childs == null || childs.Count == 0)
                        {
                            continue;
                        }

                        if (childs.Count == 1) //если чайлд только 1, то семейство заменяем на сервис
                        {
                            inetServices.Add(childs[0]);
                        }
                        else
                        {
                            item.Childs = childs.ToArray();
                            inetServices.Add(item);
                        }
                    }
                    else if (!bundleServicesIds.Any(a => a == item.Id)) //Не семейство => проверка, что ид нет в бандлах
                    {
                        inetServices.Add(item);
                    }
                }

                result.InternetServices = inetServices.ToArray();
            }
            else
            {
                result.InternetServices = inet.InternetServices;
            }

            #endregion

            result.Tv = tv;

            #region Объединяем лигалы бандла с Инетом, ТВ
            // теперь соединяем их воедино
            if (!result.IsAuthLegal) //лигалы по старой схеме
            {
                var bundleLegal = result.Legals?.List?.FirstOrDefault(x => x.Type == LegalType.Bundle.GetDescription());
                var inetLegals = inet.Legals?.List?.FirstOrDefault(x => x.Type == LegalType.Internet.GetDescription())?.Text;
                if (inetLegals != null)
                {
                    if (bundleLegal != null)
                    {
                        bundleLegal.Text = bundleLegal.Text.Concat(inetLegals).ToArray();
                    }
                    else
                    {
                        result.Legals.List.Insert(0, new LegalItemViewModel
                        {
                            Title = result.Title,
                            Text = inetLegals,
                            Type = LegalType.Bundle.GetDescription()
                        });
                    }
                }

                if (result.Legals.List.Count > 0)
                {
                    result.Legals.List.AddRange(inet.Legals.List.Where(x => x.Type != LegalType.Internet.GetDescription()));
                }
                else
                {
                    result.Legals.List.AddRange(inet.Legals.List);
                }
            }
            else // лигалы по новой схеме
            {
                //result.Legals.List.AddRange(inet.Legals.List);
                //INFO: лигалы ТВ хранятся в result.Tv.Legals.List и добавляются на клиенте

                //INFO: код вставляющий лигал Инета (только Условия предоставления) сразу за лигалом Бандла. 
                var inetLegals = inet.Legals.List.FirstOrDefault(x => x.Type == LegalType.Internet.GetDescription()
                    && x.SubType == LegalSubType.Terms.GetDescription()); //лигал Инета (только Условия предоставления)
                if (inetLegals != null)
                {
                    var bundleLegal = result.Legals.List?.FirstOrDefault(x => x.Type == LegalType.Bundle.GetDescription());
                    var index = 0;
                    if (bundleLegal != null)
                    {
                        index = result.Legals.List.IndexOf(bundleLegal);
                    }
                    result.Legals.List.Insert(index + 1, inetLegals);
                }
            }

            //Выбор первого лигала как включенного
            if (result?.Legals?.List?.Count > 0 &&
                !(result?.Legals?.List?.Any(x => x.IsChecked)).GetValueOrDefault(false))
            {
                result.Legals.List[0].IsChecked = true;
            }
            #endregion
        }

        /// <summary>
        /// Преобразует телефон
        /// </summary>
        /// <param name="source">Телефон</param>
        /// <returns></returns>
        public HomePhoneTariffViewModel ConvertPhoneItem(HomeTariffViewModel source)
        {
            var result = new HomePhoneTariffViewModel();

            return result;
        }

        /// <summary>
        /// Конвертор архивного тарифа
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        public HomeTariffApiItemViewModel ArchiveTariffConverter(TariffViewModel source)
        {
            var result = new ArchivedHomeTariffApiItemViewModel
            {
                Id = source.Id.ToString(),
                Alias = source.Alias,
                Title = source.Title,
                ProductType = ((int)source.ProductType).ToString(),
                HasInternet = source.HasInternetTariff,
                HasTv = source.HasTvPackages,
                HasPhone = source.HasPhoneTariff,
                PhoneTitle = source.PhoneTitle,
                Fee = source.ItemFee != null ? source.ItemFee : source.SubscriptionFee,
                ChannelsCountReplacement = source.ChannelsCountReplacement,
                ChannelCount = source.ChannelCount,
                Url = GetUrl(source),
                PktMinCount = source.PktMinCount,
                ThematicPackagesCount = source.ThematicPackages?
                    .Count(),
                TariffServices = source.TariffServices?
                    .Where(x => !x.FamilyId.HasValue)
                    .Select(x => new TariffService
                    {
                        Title = x.Text,
                        Id = x.Id.ToString()
                    })
                    .ToArray(),
                Params = source.TariffParams?
                    .Select(s => ParamsConverter(s))
                    .ToList(),
                Date = new DateTime?(),
                IsOld = false
            };

            return result;
        }

        /// <summary>
        /// Конвертор старого архивного тарифа
        /// </summary>
        /// <param name="source"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public virtual HomeTariffApiItemViewModel OldArchiveTariffConverter(
            DAL.ArchiveTariff source,
            Product type)
        {
            var result = new ArchivedHomeTariffApiItemViewModel
            {
                Id = source.Id.ToString(),
                Alias = string.Empty,
                Title = source.Title,
                ProductType = ((int)type).ToString(),
                HasInternet = false,
                HasTv = false,
                Fee = new double?(),
                ChannelsCountReplacement = string.Empty,
                ChannelCount = 0,
                Url = GetOldUrl(source.Id, string.Empty),
                ThematicPackagesCount = 0,
                Params = new List<HomeTariffParamViewModel>(),
                Date = source.Created.Date,
                IsOld = true
            };

            return result;
        }

        /// <summary>
        /// Конвертор старого архивного тарифа
        /// </summary>
        /// <param name="source"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public virtual HomeTariffApiItemViewModel OldArchiveTariffConverter(
            DAL.ArchiveTvTariff source)
        {
            var result = new ArchivedHomeTariffApiItemViewModel
            {
                Id = source.Id.ToString(),
                Alias = string.Empty,
                Title = source.Title,
                ProductType = ((int)Product.Tv).ToString(),
                HasInternet = false,
                HasTv = false,
                Fee = new double?(),
                ChannelsCountReplacement = string.Empty,
                ChannelCount = 0,
                Url = GetOldUrl(source.Id, string.Empty),
                ThematicPackagesCount = 0,
                Params = new List<HomeTariffParamViewModel>(),
                Date = source.Created.Date,
                IsOld = true
            };

            return result;
        }

        /// <summary>
        /// Возвращает ссылку на карточку для старого архивного тарифа
        /// </summary>
        /// <param name="id">Ид. тарифа</param>
        /// <param name="alias">Алиас тарифа</param>
        /// <returns></returns>
        protected virtual string GetOldUrl(
            int id, string alias)
        {
            var url = new UrlHelper(HttpContext.Current.Request.RequestContext);

            return url.Action(
                HomeTariffPageController.ActionNameConstants.ArchiveDetail,
                HomeTariffPageController.NameConst,
                new RouteValueDictionary()
                {
                    { "ui-item", SitemapHelper.AnonymousHomeCatalog },
                    { "id", string.IsNullOrEmpty(alias) ? id.ToString() : alias }
                });
        }
    }
}