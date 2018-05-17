using Vendor.Client.WebApp.Models.HomeTariffs.Api.Providers;
using Vendor.Core.Enums;
using Vendor.DAL.Interfaces;
using Vendor.Interface.Data.DPC;
using Vendor.Interface.Services;
using System.Linq;
using Vendor.Core.Logger;
using Vendor.Client.WebApp.Models.HomeTariffs.Api.Converters;
using Vendor.Infrastructure;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Api.Factories
{
    /// <summary>
    /// Фабрика создания провайдеров
    /// </summary>
    public class HomeProviderFactory : IHomeProviderFactory
    {
        private readonly ILogger _logger = null;
        private readonly IHomeServiceTariffService _tariffService = null;
        private readonly IEquipmentService _equipmentService = null;
        private readonly IDictionaryService _dictionaryService = null;
        private readonly IHomeArchiveTariffRepository _homeArchiveTariffRepository = null;
        private readonly IHomeTvArchiveTariffRepository _homeTvArchiveTariffRepository = null;
        private readonly IHomeDpcService _dpcService = null;

        /// <summary>
        /// Конструктор
        /// </summary>
        /// <param name="tariffService">Сервис тарифов</param>
        /// <param name="equipmentService">Сервис оборудования</param>
        /// <param name="dictionaryService">Сервис справочников</param>
        /// <param name="homeArchiveTariffRepository">Репозиторий архивных тарифов</param>
        /// <param name="homeTvArchiveTariffRepository">Репозиторий архивных тв-тарифов</param>
        /// <param name="dpcService">Сервис DPC</param>
        /// <param name="logger">Логгер</param>
        public HomeProviderFactory(
            IHomeServiceTariffService tariffService,
            IEquipmentService equipmentService,
            IDictionaryService dictionaryService,
            IHomeArchiveTariffRepository homeArchiveTariffRepository,
            IHomeTvArchiveTariffRepository homeTvArchiveTariffRepository,
            IHomeDpcService dpcService,
            ILogger logger)
        {
            _logger = logger;
            _tariffService = tariffService;
            _equipmentService = equipmentService;
            _dictionaryService = dictionaryService;
            _homeArchiveTariffRepository = homeArchiveTariffRepository;
            _homeTvArchiveTariffRepository = homeTvArchiveTariffRepository;
            _dpcService = dpcService;
        }

        /// <summary>
        /// Конструирует провайдер по параметрам
        /// </summary>
        /// <param name="regionId">Регион</param>
        /// <param name="type">Тип продукта</param>
        /// <returns></returns>
        public virtual IHomeProvider GetProvider(
            int regionId,
            ProductType type = ProductType.None)
        {
            if (!IsAllowDpcRegion(regionId) ||
                (type != ProductType.None && !IsAllowDpcCard(type)) ||
                !Features.IsUseDpcInNewHomeCatalog)
            {
                return new QpHomeProvider(
                    regionId,
                    _tariffService,
                    _dictionaryService,
                    _homeArchiveTariffRepository,
                    _homeTvArchiveTariffRepository,
                    _equipmentService,
                    new QpHomeConverter(_logger));
            }

            return new DpcHomeProvider(
                regionId,
                _dpcService,
                new DpcHomeConverter(_logger));
        }

        /// <summary>
        /// Проверяет доступность dpc для региона
        /// </summary>
        /// <param name="regionId">Регион</param>
        /// <returns></returns>
        protected virtual bool IsAllowDpcRegion(int regionId)
        {
            return AppConfiguration.AllowNewShpdDpcCatalog(regionId);
        }

        /// <summary>
        /// Проверяет доступность dpc для типа продукта
        /// </summary>
        /// <param name="type">Тип продукта</param>
        /// <returns></returns>
        protected virtual bool IsAllowDpcCard(ProductType type)
        {
            return AppConfiguration.NewShpdDpcCatalogAllowCards?.Length == 0 ||
                AppConfiguration.NewShpdDpcCatalogAllowCards.Contains(type.GetDescription());
        }
    }
}