using QA.Beeline.Client.Models.Enums.USSS;
using QA.Beeline.Client.WebApp.Models.HomeTariffs.Presets;
using QA.Beeline.Client.WebApp.Models.HomeTariffs.Presets.Converters;
using QA.Beeline.Interface.Data.USSS;
using QA.Beeline.Interface.Enums;
using QA.Beeline.Interface.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QA.Beeline.Client.WebApp.LocalServices.Impl.Home
{
    /// <summary>
    /// Сервис инак-пресетов
    /// </summary>
    public class HomePresetService : IHomePresetService
    {
        private readonly IUsssApiService _usssApiService;
        private readonly IHomePresetServiceFactory _convertersFactory;
        private readonly IHomePresetConverter _converter;

        public HomePresetService(
            IUsssApiService usssApiService,
            IHomePresetServiceFactory convertersFactory,
            IHomePresetConverter converter)
        {
            _usssApiService = usssApiService;
            _convertersFactory = convertersFactory;
            _converter = converter;
        }

        /// <summary>
        /// Возвращает список инак-пресетов для преставления каталога
        /// </summary>
        /// <param name="login">Логин</param>
        /// <returns></returns>
        public async virtual Task<FttbPresetViewModel[]> GetPresets(string login)
        {
            var connectedTask = GetConnectedFttbPreset(login);
            var availableTask = GetAvailableFttbPresets(login);

            await Task.WhenAll(connectedTask, availableTask);

            var presets = availableTask.Result ?? new List<Service>();

            if (connectedTask.Result?.SplId != null)
            {
                var preset = (await _usssApiService
                    .GetServiceParamsAsync(
                        null,
                        connectedTask.Result.SplId,
                        login))?
                    .Result?
                    .Service;

                if (preset != null)
                {
                    presets.Add(preset);
                }
            }

            var accumulators = await GetAccumulators(presets, login);
            var result = presets?
               .Select(s => _converter
                    .ConvertFttbPreset(
                        s,
                        accumulators))
               .ToArray();

            return result;
        }

        /// <summary>
        /// Возвращает аккумуляторы услуг пресетов
        /// </summary>
        /// <param name="presets">Пресеты</param>
        /// <param name="login">Логин</param>
        /// <returns></returns>
        protected virtual async Task<List<AccumulatorsResponseViewModel>> GetAccumulators(
            List<Service> presets,
            string login)
        {
            var services = presets?
               .SelectMany(x => x.Containers)
               .SelectMany(x => x.Services)
               .Where(x => !string.IsNullOrWhiteSpace(
                   x.GetAdditionalParamValue(
                       AdditionalParamNames.AccId,
                       string.Empty)))
               .ToArray();

            var tasks = services?
                .Select(x => Task.Run(async () =>
                {
                    var accId = x.GetAdditionalParamValue(
                        AdditionalParamNames.AccId,
                        0);
                    var acc = await _usssApiService.GetAccumulatorParamsAsync(
                        accId,
                        x.ServiceId,
                        login);

                    return new AccumulatorsResponseViewModel
                    {
                        Id = accId,
                        Services = acc?.Result?.Services?
                            .Select(s => new AccumulatorEntryViewModel
                            {
                                ServiceId = s.ServiceId,
                                Discount = s.Discount,
                                DiscountType = s.DiscountType,
                                Price = s.Price
                            })
                            .ToArray()
                    };
                })
            );

            if (tasks?.Count() == 0)
            {
                return null;
            }

            await Task.WhenAll(tasks);

            var accumulators = tasks
                .Select(x => x.Result)
                .Where(x => x != null)
                .ToList();

            return accumulators;
        }

        /// <summary>
        /// Возвращает подключенный инак пресет
        /// </summary>
        /// <param name="login">Логин</param>
        /// <returns></returns>
        public virtual async Task<Service> GetConnectedFttbPreset(string login)
        {
            var connectedServices = await _usssApiService.GetConnectedServicesAsync(
                login);

            return connectedServices?.Result?.Containers?
                .Where(x => x.ServiceTypeValue == ServiceTypeEnum.FTTB_PRESET)
                .SelectMany(s => s.Services)
                .FirstOrDefault();
        }

        /// <summary>
        /// Возвращает список услуг (кроме инак-пресетов)
        /// </summary>
        /// <param name="login">Логин</param>
        /// <returns></returns>
        public async virtual Task<FttbServiceViewModel[]> GetServices(string login)
        {
            var connectedTask = _usssApiService.GetConnectedServicesAsync(
                login);
            var availableTask = _usssApiService.GetAvailableServicesAsync(
                login);

            await Task.WhenAll(connectedTask, availableTask);

            var services = connectedTask?.Result?.Result?.Containers ??
                new List<ServiceContainer>();

            services = services
                .Union(
                    availableTask?.Result?.Result?.Containers ??
                        new List<ServiceContainer>())
                .ToList();

            var types = new[] {
                ServiceTypeEnum.BUNDLE,
                ServiceTypeEnum.VPDN,
                ServiceTypeEnum.IPTV_TARIFF_ENTITY,
                ServiceTypeEnum.IPTV_PAID_COURIER_CALL
            };

            return services
                .Where(x => types.Contains(x.ServiceTypeValue))
                .SelectMany(s => s.Services)
                .Select(x => _convertersFactory
                    .ConvertStandaloneService(x))
                .ToArray();
        }

        /// <summary>
        /// Возвращает дотупные инак-пресеты
        /// </summary>
        /// <param name="login">Логин</param>
        /// <returns></returns>
        public virtual async Task<List<Service>> GetAvailableFttbPresets(string login)
        {
            var services = await _usssApiService.GetAvailableServicesAsync(
                login);

            return services?.Result?.Containers?
                .Where(x => x.ServiceTypeValue == ServiceTypeEnum.FTTB_PRESET)
                .SelectMany(s => s.Services)
                .ToList();
        }

        /// <summary>
        /// Возвращает результат наличия подключенного инак пресета
        /// </summary>
        /// <param name="login">Логин</param>
        /// <returns></returns>
        public virtual async Task<bool> HasFttbPreset(string login)
        {
            var preset = await GetConnectedFttbPreset(login);

            return preset != null;
        }
    }
}