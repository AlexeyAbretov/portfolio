using Vendor.Interface.Data.HomeTariffs.Bill;
using Vendor.Client.WebApp.Models.HomeTariffs.Api.Converters;
using Vendor.Client.WebApp.Models.HomeTariffs.ListTariff;
using Vendor.Interface.Services;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Vendor.Interface.Data.Dictionary;
using Vendor.Core.Enums;
using Vendor.DAL.Interfaces;
using Vendor.Interface.Data.HomeTariffs;
using Vendor.Interface.Data.USSS;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Api.Providers
{
    /// <summary>
    /// Провайдер QP
    /// </summary>
    public class QpHomeProvider : HomeProviderBase
    {
        private readonly QpHomeConverter _converter = null;
        private readonly IHomeServiceTariffService _tariffService = null;
        private readonly IDictionaryService _dictionaryService = null;
        private readonly IHomeArchiveTariffRepository _homeArchiveTariffRepository = null;
        private readonly IHomeTvArchiveTariffRepository _homeTvArchiveTariffRepository = null;
        private readonly IEquipmentService _equipmentService = null;

        /// <summary>
        /// Конструктор
        /// </summary>
        /// <param name="regionId">Регион</param>
        /// <param name="tariffService">Сервис тарифов</param>
        /// <param name="dictionaryService">Сервис справочников</param>
        /// <param name="homeArchiveTariffRepository">Сервис архивных тарифов</param>
        /// <param name="homeTvArchiveTariffRepository">Сервис архивных тв-тарифов</param>
        /// <param name="equipmentService">Сервис оборудование</param>
        /// <param name="converter">Преобразователь</param>
        public QpHomeProvider(
            int regionId,
            IHomeServiceTariffService tariffService,
            IDictionaryService dictionaryService,
            IHomeArchiveTariffRepository homeArchiveTariffRepository,
            IHomeTvArchiveTariffRepository homeTvArchiveTariffRepository,
            IEquipmentService equipmentService,
            QpHomeConverter converter) : base(regionId)
        {
            _converter = converter;
            _tariffService = tariffService;
            _dictionaryService = dictionaryService;
            _homeArchiveTariffRepository = homeArchiveTariffRepository;
            _homeTvArchiveTariffRepository = homeTvArchiveTariffRepository;
            _equipmentService = equipmentService;
        }

        /// <summary>
        /// Возвращает информация об услуге "Поддержка линии"
        /// </summary>
        /// <returns></returns>
        protected override ServiceMarketingItem GetSupportService()
        {
            var services = _tariffService
                .GetIncludeInCartForTvTariffsWithoutInternetServices(
                    RegionId);

            var supportService = services?.Result?.FirstOrDefault(
                x => x.IncludeInCartForTvTariffsWithoutInternet);

            return supportService;
        }

        /// <summary>
        /// Возвращает тарифы
        /// </summary>
        /// <param name="isArchive">Признак архивности</param>
        /// <returns></returns>
        public async override Task<HomeTariffApiListViewModel> GetTariffs(
            bool isArchive = false)
        {
            var list = await HomeItemListModel.GetTariffs(
               null,
               false,
               RegionId,
               false,
               false,
               string.Empty, true, isArchive);

            if (isArchive)
            {
                var items = list
                    .Select(_converter.ArchiveTariffConverter)
                    .ToList();
                var oldTariffs = GetOldArchiveTariffs(RegionId);

                items = items
                    .Union(oldTariffs)
                    .ToList();

                return new HomeTariffApiListViewModel
                {
                    List = items
                };
            }

            var result = _converter.ConvertList(
                list,
                GetSupportService()?.Title,
                _dictionaryService.GetDeviceTypes().Result,
                RegionId);

            return result;
        }

        /// <summary>
        /// Возвращает старые архивные тарифы
        /// </summary>
        /// <param name="regionId"></param>
        /// <returns></returns>
        protected virtual List<HomeTariffApiItemViewModel> GetOldArchiveTariffs(
            int regionId)
        {
            var tvAlias = "tv";
            var internetAlias = "internet";
            var packagesAlias = "pakety-uslug";

            var tvId = _dictionaryService.GetDeviceTypeId(tvAlias).Result;
            var internetId = _dictionaryService.GetDeviceTypeId(internetAlias).Result;
            var packagesId = _dictionaryService.GetDeviceTypeId(packagesAlias).Result;

            var archiveTv = _homeArchiveTariffRepository.GetOldArchiveTariffs(
                null, regionId, tvId)
                .ToList();
            var archiveInternet = _homeArchiveTariffRepository.GetOldArchiveTariffs(
                null, regionId, internetId)
                .ToList();
            var archivePackages = _homeArchiveTariffRepository.GetOldArchiveTariffs(
                null, regionId, packagesId)
                .ToList();

            var archiveTvTariffs = _homeTvArchiveTariffRepository.GetTariffs(
                string.Empty, regionId)
                .ToList();

            var archiveTvItemData = archiveTv
                .Select(c => _converter.OldArchiveTariffConverter(c, Product.Tv))
                .ToArray();

            var archiveInternetItemData = archiveInternet
                .Select(c => _converter.OldArchiveTariffConverter(c, Product.Internet))
                .ToArray();

            var archivePackagesItemData = archivePackages
                .Select(c => _converter.OldArchiveTariffConverter(c, Product.Kit))
                .ToArray();

            var archiveTvTariffsItemData = archiveTvTariffs
                .Select(c => _converter.OldArchiveTariffConverter(c))
                .ToArray();

            var result = archiveTvItemData
                .Union(archiveInternetItemData
                    .AsEnumerable())
                .Union(archivePackagesItemData
                    .AsEnumerable())
                .Union(archiveTvTariffsItemData
                    .AsEnumerable())
                .ToList();

            return result;
        }

        /// <summary>
        /// Возвращает тариф интернета
        /// </summary>
        /// <param name="id">Ид.</param>
        /// <returns></returns>
        internal override async Task<HomeItemCardViewModel> GetInternetTariff(
            string id)
        {
            var viewModel = new InternetTariffModel().GetViewModel(id, RegionId);

            if (viewModel == null)
            {
                return null;
            }

            var items = await GetTariffs();

            // Ищу только для вифи роутеров, т.к. для другого не надо по ТЗ.
            // На клиенте будет проверка типа, при необходимости, это поле можно заполянть полным массивом оборудования
            var servicesWithEquip = viewModel.TariffServices?
                .Where(x => x.ServiceType == ServiceType.WifiRouter.GetDescription())
                .Select(x => x.Id)
                .ToList();
            var equipments = _equipmentService.GetEquipmentsForProvodServiceNewShpd(
                servicesWithEquip, RegionId).Result;

            var legals = GetInetLegals(
                viewModel,
                out bool isAuthLegals);

            var result = _converter.ConvertInternetItem(
                viewModel,
                items,
                equipments,
                legals,
                isAuthLegals);

            return await Task.FromResult(result);
        }

        /// <summary>
        /// Возвращает тариф бандла
        /// </summary>
        /// <param name="id">Ид.</param>
        /// <returns></returns>
        internal override async Task<HomeItemCardViewModel> GetKitTariff(
            string id)
        {
            var viewModel = new KitTariffModel().GetViewModel(
                id, RegionId) as KitViewModel;

            if (viewModel == null)
            {
                return null;
            }

            var items = await GetTariffs();
            var inet = (HomeInternetTariffViewModel)await GetInternetTariff(viewModel.InternetId.ToString());
            var tv = (HomeTvTariffViewModel)await GetTvTariff(viewModel.TvId);

            var legals = GetKitLegals(viewModel, out bool isAuthLegals);

            //Сначала проверяем, если есть хоть 1 не isAuthLegal => все остальные должны быть такими же (старыми лигалами)
            if ((isAuthLegals || (inet?.IsAuthLegal).GetValueOrDefault(false) || (tv?.IsAuthLegal).GetValueOrDefault(false)) &&
                (!isAuthLegals || !(inet?.IsAuthLegal).GetValueOrDefault(false) || !(tv?.IsAuthLegal).GetValueOrDefault(false)))
            {
                //перевести все лигалы в старый формат
                if (isAuthLegals)
                {
                    legals = GetKitLegals(viewModel, out isAuthLegals, true);
                    isAuthLegals = false;
                }
                if ((inet?.IsAuthLegal).GetValueOrDefault(false))
                {
                    var inetViewModel = new InternetTariffModel().GetViewModel(id, RegionId);
                    inet.Legals.List = GetInetLegals(inetViewModel, out bool isAuth, true);
                    inet.IsAuthLegal = isAuth;
                }
            }

            var result = _converter.ConvertKitItem(
                viewModel,
                items,
                inet,
                tv,
                legals,
                isAuthLegals);

            return await Task.FromResult(result);
        }

        /// <summary>
        /// Возвращает тариф телефона
        /// </summary>
        /// <param name="id">Ид.</param>
        /// <returns></returns>
        internal override async Task<HomeItemCardViewModel> GetPhoneTariff(
            string id)
        {
            var viewModel = (new PhoneTariffModel()).GetViewModel(
                id, RegionId);

            if (viewModel == null)
            {
                return null;
            }

            var result = _converter.ConvertPhoneItem(viewModel);

            return await Task.FromResult(result);
        }

        /// <summary>
        /// Возвращает тариф тв
        /// </summary>
        /// <param name="id">Ид.</param>
        /// <returns></returns>
        internal async override Task<HomeItemCardViewModel> GetTvTariff(
            string id)
        {
            var tvModel = new TvTariffModel();
            var viewModel = tvModel.GetViewModel(id, RegionId);

            if (viewModel == null)
            {
                return null;
            }

            var legals = GetTvLegals(
                (TvViewModel)viewModel);
            var supportService = GetSupportService();
            var items = await GetTariffs();
            var result = _converter.ConvertTvItem(
                (TvViewModel)viewModel,
                items,
                supportService,
                legals);

            return await Task.FromResult(result);
        }

        /// <summary>
        /// Возвращает лигалы тв
        /// </summary>
        /// <param name="source">Тариф</param>
        /// <param name="isBundle">Признак нахождения тарифа в бандле</param>
        /// <returns></returns>
        protected virtual List<LegalItemViewModel> GetTvLegals(
            TvViewModel source,
            bool isBundle = false)
        {
            var res = new List<LegalItemViewModel>();

            var legals = (string.IsNullOrWhiteSpace(source.MarketingLegal) ?
                    new string[] { } :
                    new[]
                    {
                        source.MarketingLegal,
                    })
                .Union(string.IsNullOrWhiteSpace(source.Legal) ?
                    new string[] { } :
                    new[]
                    {
                        source.Legal
                    })
                .Union(source.GetChannelsLegal()
                    .SelectMany(s => s.Text))
                .Union(source.GetPackagesLegal()
                    .SelectMany(s => s.Text))
                .ToArray();

            if (legals.Length > 0)
            {
                res.Add(new LegalItemViewModel
                {
                    Title = SiteTextUtils.GetSiteText(
                        TextTitles.NEW_SHPD_CATALOG_TV_LEGAL_TITLE),
                    IsChecked = true,
                    Text = legals,
                    Type = LegalType.TvTariff.GetDescription()
                });
            }

            res.AddRange(
                source.TariffServices?
                    .Select(s => new LegalItemViewModel
                    {
                        Title = s.Text,
                        Type = LegalType.Service.GetDescription(),
                        Text = new[] { s.Legal }
                            .Union(string.IsNullOrWhiteSpace(s.LegalMarketing) ?
                                new string[] { } :
                                new[]
                                {
                                    s.LegalMarketing
                                })
                            .ToArray()
                    })
                    .ToArray());
            if (!isBundle)
            {
                var lastLegalTitle = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_TITLE_UNDER_PARAMETERS_FOR_TV_CARD);
                var lastLegalText = SiteTextUtils.GetSiteText(
                    TextTitles.NEW_SHPD_CATALOG_TEXT_UNDER_PARAMETERS_FOR_TV_CARD);

                if (!string.IsNullOrWhiteSpace(lastLegalTitle) &&
                    !string.IsNullOrWhiteSpace(lastLegalText))
                {
                    res.Add(new LegalItemViewModel
                    {
                        Title = lastLegalTitle,
                        Text = new string[] { lastLegalText },
                        Type = LegalType.TvTariff.GetDescription()
                    });
                }
            }

            return res;
        }

        /// <summary>
        /// озвращает лигалы интернета
        /// </summary>
        /// <param name="source">Тариф</param>
        /// <param name="isAuthLegal">Если на тарифе Инет бандла, полученном ранее, старый лигал - тут тоже должне быть старый</param>
        /// <param name="forceOldLegals">Принудительное получение старых лигалов</param>
        /// <returns></returns>
        protected virtual List<LegalItemViewModel> GetInetLegals(
            HomeTariffViewModel source,
            out bool isAuthLegal,
            bool forceOldLegals = false)
        {
            var res = new List<LegalItemViewModel>();
            List<LegalItemViewModel> authLegals = null;

            if (!forceOldLegals)
            {
                authLegals = GetAuthLegals(source.InacId, source.Id.ToString(), ServiceTypeEnum.VPDN, source.TariffType);
            }

            isAuthLegal = authLegals != null && authLegals.Count > 0;

            if (isAuthLegal)
            {
                res.AddRange(authLegals);
            }
            else //для данного тарифа лигалы по старой схеме
            {
                res.Add(new LegalItemViewModel
                {
                    Title = SiteTextUtils.GetSiteText(
                            TextTitles.NEW_SHPD_CATALOG_LEGAL_INTERNET),
                    Text = source.AdvancedInfo.SelectMany(x => x.Text).ToArray(),
                    Type = LegalType.Internet.GetDescription()
                });

                source.TariffServices?.ToList().ForEach(service =>
                {
                    res.AddRange(GetServiceLegals(service));
                });

                var vsu = source.ParamGroups
                    .SelectMany(x => x.Parameters)
                    .FirstOrDefault(x => x.Id > 0 && x.SpeedGroup != null);

                if (vsu.SpeedGroup != null)
                {
                    var minFee = vsu.SpeedGroup?.MinVsuFee();
                    var vsuMinFee = vsu.SpeedGroup?.Services?
                        .FirstOrDefault(x => (decimal)x.SubscriptionFee.GetValueOrDefault() == minFee.GetValueOrDefault());

                    if (!string.IsNullOrEmpty(vsuMinFee.Legal) || !string.IsNullOrEmpty(vsuMinFee.LegalMarketing))
                    {
                        res.Add(new LegalItemViewModel
                        {
                            Title = vsuMinFee.Text,
                            Text = new string[] { vsuMinFee.Legal, vsuMinFee.LegalMarketing },
                            Type = LegalType.Service.GetDescription()
                        });
                    }
                }
            }
            return res;
        }

        /// <summary>
        /// озвращает лигалы бандла
        /// </summary>
        /// <param name="source">Тариф</param>
        /// <param name="isAuthLegal">Если на тарифе Инет бандла, полученном ранее, старый лигал - тут тоже должне быть старый</param>
        /// <param name="forceOldLegals">Принудительное получение старых лигалов</param>
        /// <returns></returns>
        protected virtual List<LegalItemViewModel> GetKitLegals(
            KitViewModel source,
            out bool isAuthLegal,
            bool forceOldLegals = false)
        {
            var res = new List<LegalItemViewModel>();
            isAuthLegal = false;

            var services = source.TariffServices?
                .Where(x => x.FamilyId.HasValue)
                .GroupBy(
                    x => x.FamilyId,
                    x => x,
                    (key, group) => new ServiceApiViewModel(
                        group.FirstOrDefault(),
                        string.Empty,
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
                        .Select(x => new ServiceApiViewModel(x, string.Empty, isInBundle: true))
                );

            #region Получение лигалов из контента Лигалы ШПД
            var authLegals = new List<LegalItemViewModel>();
            if (!forceOldLegals)
            {
                var bundleElemetsTypes = services?
                    .Select(x => ServiceTypeQpToUssConverter(
                        x.GetTypeExact()).GetDescription())
                    .ToList();
                bundleElemetsTypes.Add(ServiceTypeEnum.VPDN.GetDescription()); //Инет-тариф всегда есть на бандле
                bundleElemetsTypes = bundleElemetsTypes
                    .OrderBy(x => x).ToList();
                if (source.HasTv)
                {
                    bundleElemetsTypes.Add(
                        ServiceTypeEnum.IPTV_TARIFF_ENTITY.GetDescription());
                }

                authLegals = GetAuthLegals(
                    source.InacId,
                    source.Id.ToString(),
                    ServiceTypeEnum.BUNDLE,
                    source.TariffType,
                    null,
                    bundleElemetsTypes.ToArray());

                isAuthLegal = authLegals.Count > 0;
                if (isAuthLegal) //на бандле есть, смотрим сервисы
                {
                    if (services != null)
                    {
                        //Если хоть на одном сервисе не найдется лигала ШПД, весь лигал бандла показывается по старому
                        foreach (var s in services)
                        {
                            var legals = GetAuthLegals(
                                s.InacId,
                                s.Id,
                                ServiceTypeQpToUssConverter(s.GetTypeExact()),
                                null,
                                s.Title);
                            if (legals.Count == 0)
                            {
                                isAuthLegal = false;
                                break;
                            }
                            authLegals.AddRange(legals);
                        }
                    }
                }
            }
            isAuthLegal = isAuthLegal && authLegals != null && authLegals.Count > 0;
            //Если у бандла или хоть на одном сервисе не найдется лигала ШПД, весь лигал бандла показывается по старому
            if (isAuthLegal)
            {
                res.AddRange(authLegals);
            }
            #endregion
            else //для данного тарифа лигалы по старой схеме
            {
                if (!string.IsNullOrEmpty(source.Legal) || !string.IsNullOrEmpty(source.MarketingLegal))
                {
                    res.Add(new LegalItemViewModel
                    {
                        Title = source.Title,
                        Text = new string[] { source.Legal, source.MarketingLegal },
                        Type = LegalType.Bundle.GetDescription()
                    });
                }

                source.TariffServices?.ToList().ForEach(service =>
                {
                    res.AddRange(GetServiceLegals(service));
                });
            }

            return res;
        }

        /// <summary>
        /// Маппинг ServiceType2 в ServiceTypeEnum (для получения авт лигалов)
        /// Когда будет понятна область применения, надо вынести куда-то более глобально
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        protected virtual ServiceTypeEnum ServiceTypeQpToUssConverter(ServiceType2 type)
        {
            switch (type)
            {
                case ServiceType2.ReturnBroadcast:
                case ServiceType2.None:
                    return ServiceTypeEnum.UNDEFINED;
                case ServiceType2.AnnualContract:
                    return ServiceTypeEnum.ANNUAL_CONTRACT;
                case ServiceType2.ChooseSpeed:
                    return ServiceTypeEnum.VSU_SERVICE;
                case ServiceType2.TvConsole:
                case ServiceType2.AdditionalTvConsole:
                    return ServiceTypeEnum.IPTV_CONSOLE_RENT;
                case ServiceType2.Multiroom:
                    return ServiceTypeEnum.IPTV_MULTIROOM;
                case ServiceType2.AntivirusKaspersky:
                    return ServiceTypeEnum.KASPER;
                case ServiceType2.AntivirusDrWeb:
                    return ServiceTypeEnum.DR_WEB;
                case ServiceType2.AntivirusEset:
                    return ServiceTypeEnum.ESET;
                case ServiceType2.WifiRouter:
                    return ServiceTypeEnum.WIFI_RENT;
                default:
                    break;
            }
            return ServiceTypeEnum.UNDEFINED;
        }

        /// <summary>
        /// Возвращает лигалы услуги
        /// </summary>
        /// <param name="service">Услуга</param>
        /// <returns></returns>
        protected virtual IEnumerable<LegalItemViewModel> GetServiceLegals(
            ParamViewModel service)
        {
            var res = new List<LegalItemViewModel>();
            if (service.Childs != null && service.Childs.Length > 0)
            {
                foreach (var child in service.Childs)
                {
                    res.AddRange(GetServiceLegals(child));
                }
            }
            else
            {
                var texts = new List<string>
                {
                    service.Legal,
                    service.LegalMarketing
                };

                service.Groups?.ToList().ForEach(group =>
                {
                    texts.Add(group.Legal);
                    group.Parameters?.ToList().ForEach(param =>
                    {
                        texts.Add(param.Legal);
                    });
                });

                texts.RemoveAll(text => string.IsNullOrEmpty(text));
                if (texts.Count > 0)
                {
                    res.Add(new LegalItemViewModel
                    {
                        ServiceId = service.Id.ToString(),
                        Title = service.Text,
                        Type = LegalType.Service.GetDescription(),
                        Text = texts.ToArray()
                    });
                }
            }
            return res;
        }

        /// <summary>
        /// Получени лигалов авторизованной зоны ШПД для неавторизованного сервиса или тарифа.
        /// </summary>
        /// <param name="inacId">сервиса или тарифа. поиск по соответствию этого поля serviceId</param>
        /// <param name="serviceType">VPDN, BUNDLE, etc</param>
        /// <param name="tariffType">Тип тарифа интернет (L, MULTI, etc)</param>
        /// <param name="serviceTitle">Название услуги (не тарифа)</param>
        /// <returns></returns>
        protected List<LegalItemViewModel> GetAuthLegals(string inacId,
            string id,
            ServiceTypeEnum serviceType,
            string tariffType = null,
            string serviceTitle = null,
            string[] bundleElements = null)
        {
            List<LegalItemViewModel> res = new List<LegalItemViewModel>();
            var authLegalsRes = _dictionaryService.GetHomeLegals();
            if (authLegalsRes == null
                || !authLegalsRes.IsSucceeded
                || authLegalsRes.Result == null
                || authLegalsRes.Result.Count == 0)
                return res;


            if (authLegalsRes != null && authLegalsRes.IsSucceeded && authLegalsRes.Result != null && authLegalsRes.Result.Count > 0)
            {
                //Ищется соответствие поля INACID в ргеиональном комплекте и поля ServiceID 
                var legalMain = authLegalsRes.Result.FirstOrDefault(x => x.ServiceId == inacId);
                if (legalMain == null) //не найдено
                {
                    //для бандла ищется соответствие набора тарифов и услуг, входящих в бандл, с полем «Типы сервисов, входящих в бандл»
                    if (serviceType == ServiceTypeEnum.BUNDLE
                        && bundleElements != null
                        && bundleElements.Length > 0)
                    {
                        foreach (var item in authLegalsRes.Result)
                        {
                            if (item.ServiceTypesArray != null && Enumerable.SequenceEqual(item.ServiceTypesArray.OrderBy(x => x), bundleElements.OrderBy(x => x)))
                            {
                                legalMain = item;
                                break;
                            }
                        }
                    }
                    if (legalMain == null) //все еще не найдено
                    {
                        var serviceTypeStr = serviceType.GetDescription();
                        //ищется лигал, в котором значение поля «Тип сервиса» равно serviceType
                        legalMain = authLegalsRes.Result.FirstOrDefault(x => x.ServiceType == serviceTypeStr);
                    }
                }

                //Если сервис является тарифом интернета, то дополнительно проверяется, что его тип соответствует  значению поля «Тип тарифа» 
                if (serviceType == ServiceTypeEnum.VPDN && legalMain.TariffType != tariffType)
                {
                    //Не соответствует => этот лигал не подходит
                    legalMain = null;
                }

                if (legalMain != null)
                {
                    //сформировать правильные заголовки
                    if (!string.IsNullOrEmpty(legalMain.AdditionalInfo) // AdditionalInfo - заполняется только для заглавного тарифа карты (т.е. не для сервисов)
                        && (serviceType == ServiceTypeEnum.BUNDLE
                            || serviceType == ServiceTypeEnum.VPDN
                            || serviceType == ServiceTypeEnum.IPTV_TARIFF_ENTITY))
                    {
                        LegalType legalType = LegalType.Other;
                        if (serviceType == ServiceTypeEnum.BUNDLE)
                        {
                            legalType = LegalType.Bundle;
                        }
                        else if (serviceType == ServiceTypeEnum.VPDN)
                        {
                            legalType = LegalType.Internet;
                        }
                        else if (serviceType == ServiceTypeEnum.IPTV_TARIFF_ENTITY)
                        {
                            legalType = LegalType.TvTariff;
                        }
                        if (legalType != LegalType.Other)
                            res.Add(new LegalItemViewModel
                            {
                                ServiceId = id,
                                Title = SiteTextUtils.GetSiteText(
                                    TextTitles.NEW_SHPD_CATALOG_FULL_DESCRIPTION_TITLE), //Дополнительная информация
                                Text = new string[] { legalMain.AdditionalInfo },
                                Type = legalType.GetDescription(),
                                SubType = LegalSubType.AdditionalInfo.GetDescription()
                            });
                    }
                    if (!string.IsNullOrEmpty(legalMain.Terms)
                        && serviceType != ServiceTypeEnum.BUNDLE)
                    {
                        LegalType legalType = LegalType.Other;
                        string title;
                        if (serviceType == ServiceTypeEnum.VPDN)
                        {
                            legalType = LegalType.Internet;
                            title = SiteTextUtils.GetSiteText(
                                TextTitles.NEW_SHPD_CATALOG_LEGAL_INTERNET);
                        }
                        else if (serviceType == ServiceTypeEnum.IPTV_TARIFF_ENTITY)
                        {
                            legalType = LegalType.TvTariff;
                            title = SiteTextUtils.GetSiteText(
                                TextTitles.NEW_SHPD_CATALOG_TV_LEGAL_TITLE);
                        }
                        else
                        {
                            legalType = LegalType.Service;
                            title = SiteTextUtils.GetSiteText(
                                TextTitles.NEW_SHPD_CATALOG_SERVICE_LEGAL_TITLE).Replace("{0}", serviceTitle);
                        }

                        res.Add(new LegalItemViewModel
                        {
                            ServiceId = id,
                            Title = title, //Условия предоставления
                            Text = new string[] { legalMain.Terms },
                            Type = legalType.GetDescription(),
                            SubType = LegalSubType.Terms.GetDescription()
                        });
                    }
                }
            }

            return res;
        }
    }
}