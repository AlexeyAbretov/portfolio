using Vendor.Client.WebApp.Models.MobileTariffs.TariffParameters;
using Vendor.Interface.Data.Convergence;
using Vendor.Interface.Data.DPC;
using Vendor.Interface.Settings;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Vendor.Client.WebApp.Models.HomeTariffs.Api.Converters.ItemConverters.Dpc
{
    /// <summary>
    /// Базовая стратегия получения скоростных параметров
    /// </summary>
    public abstract class HomeDpcInternetSpeedStrategyBase
    {
        /// <summary>
        /// Список внутренних стратегий
        /// </summary>
        protected readonly List<HomeDpcInternetSpeedStrategyBase> NestedStrategies =
            new List<HomeDpcInternetSpeedStrategyBase>();

        /// <summary>
        /// Признак возможности использования стратегии
        /// </summary>
        /// <param name="product">Продукт</param>
        /// <returns></returns>
        public abstract bool CanUse(
            InternetTariffDto product);

        /// <summary>
        /// Получает параметры
        /// </summary>
        /// <param name="product">Продукт</param>
        /// <returns></returns>
        public abstract List<ParamApiViewModel> GetParameters(
            InternetTariffDto product);

        protected int? _defaultGroupId = null;
        /// <summary>
        /// Группа параметров
        /// </summary>
        protected virtual int DefaultGroupId
        {
            get
            {
                if (_defaultGroupId == null)
                {
                    int.TryParse(ClientUtils.GetQpSettings(
                        SettingTitles.NEW_SHPD_CATALOG_CARD_PARAMETERS_GROUP),
                        out int cardParamGroupId);

                    _defaultGroupId = cardParamGroupId;
                }

                return _defaultGroupId.Value;
            }
        }

        /// <summary>
        /// Возвращает скорости
        /// </summary>
        /// <param name="source">Продукт</param>
        /// <returns></returns>
        protected virtual (decimal, decimal, decimal, decimal, decimal, decimal) GetSpeeds(
            InacProductBaseDto source)
        {
            var afterLimit = ModifierAlias.AfterLimit.ToString("G");
            var peer = ModifierAlias.PeerToPeer.ToString("G");
            var modifiers = new[]
            {
                afterLimit,
                peer
            };

            var speedIn = source.ProductParams
                .FirstOrDefault(x => x.BaseParamAlias == DpcBaseParameterType.InternetSpeed.ToString("G") &&
                    !(x.BaseModifiers?
                        .Any(a => modifiers.Contains(a)) ?? false))?.NumberValue ?? 0;
            var speedOut = source.ProductParams
               .FirstOrDefault(x => x.BaseParamAlias == DpcBaseParameterType.OutgoingInternetSpeed.ToString("G") &&
                   !(x.BaseModifiers?
                       .Any(a => modifiers.Contains(a)) ?? false))?.NumberValue ?? 0;
            var speedIn1 = source.ProductParams
                .FirstOrDefault(x => x.BaseParamAlias == DpcBaseParameterType.InternetSpeed.ToString("G") &&
                    (x.BaseModifiers?
                        .Any(a => a == afterLimit) ?? false))?.NumberValue ?? 0;
            var speedOut1 = source.ProductParams
               .FirstOrDefault(x => x.BaseParamAlias == DpcBaseParameterType.OutgoingInternetSpeed.ToString("G") &&
                   (x.BaseModifiers?
                       .Any(a => a == afterLimit) ?? false))?.NumberValue ?? 0;

            return (speedIn, speedOut, speedIn1, speedOut1, 0, 0);
        }

        /// <summary>
        /// Создает параметр
        /// </summary>
        /// <param name="grId">Группа</param>
        /// <param name="text">Заголовок</param>
        /// <param name="value">Значение</param>
        /// <returns></returns>
        protected virtual ParamApiViewModel CreateParam(
            string text,
            string value)
        {
            return new ParamApiViewModel
            {
                Id = Guid.NewGuid().GetHashCode(),
                Text = text,
                Value = value,
                GroupId = DefaultGroupId,
                // для скоростных параметров должно быть не null
                AdditionalValue = 0
            };
        }
    }
}