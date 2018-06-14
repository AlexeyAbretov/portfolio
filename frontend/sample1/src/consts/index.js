// Типы услуг
export const ServiceTypes = {
  Undefined: -1,

  // Сервис 'Антивирус Dr. Web'
  DrWeb: 1,

  // Сервис 'Антивирус Eset'
  Eset: 2,

  // Сервис 'Антивирус Касперского'
  Kasper: 3,

  // Сервис 'Домашний цифровой телефон (ДЦТ)'
  Phone: 4,

  // Сервис 'Статический IP-адрес'
  StaticIp: 5,

  // Сервис 'Тариф ШПД'
  Internet: 6,

  // Сервис 'Wifi'
  Wifi: 7,

  // Сервис 'Турбокнопка'
  TurboButton: 8,

  // Бандл
  Kit: 9,

  // Сервис 'Firewall'
  Firewall: 10,

  // Сервис 'Годовой контракт'
  AnnualContract: 11,

  // Сервис 'Мобильное телевидение'
  MobileTv: 12,

  // Сервис 'Выбор скорости'
  Vsu: 13,

  // Сервис 'Дополнительные параметры ТВ-тарифа'
  TvTariff: 14,

  // Сервис 'Услуга Мультирум'
  Multiroom: 15,

  // нет описания, возможно не используется
  WifiRent: 16,

  // Сервис 'Аренда ТВ-приставки'
  TvConsole: 17,

  // Стоимость работы курьера
  Courier: 18,

  // Пресет
  Preset: 19,

  // Страхование
  Insurance: 20,

  // Параметры подключенного пресета
  FamilyConv: 21,

  // Пакетное телевидение
  TvCapsule: 22,

  // Пресет Домашнего Билайн
  FttbPreset: 23,

  // TVE
  Tve: 24,

  // Сервис Возврат роутера курьером
  WifiCourier: 25,

  // Автомат доверия
  AutoPromisePayment: 26,

  // Возврат эфира
  ReturnEther: 130,
};

// порядок сортировки
export const SortOrder = {
  Asc: 1,
  Desc: 2
};

// группы пресетов
export const Groups = {
  InetTv: 'INETTV',
  Inet: 'INET',
  Tv: 'TV'
};

export const GridRowType = {
  Link: 'Link',
  Inline: 'Inline'
};

export const GridRowStatus = {
  Connected: 'Connected',
  Allow: 'Allow',
  Default: 'Default'
};

export const TvPacketTypes = {
  // Базовый пакет
  Base: 1,

  // Тип пкаета (тематические, преимальные)
  Packet: 2,

  // Подтип
  Sub: 3,

  // Конкретный пакет
  Concrete: 4,

  // Неизвестный тип
  Uncknow: 0
};

export const MappingState = {
  Select: 'select',
  Change: 'change',
  Delete: 'delete'
};

export const TvPacketSaveStatus = {
  // По идентфикатору
  ById: 1,

  // По названию
  ByName: 2,

  // Не указан
  Unknow: 0
};

export const AccumulatorDiscountType = {
  // Не указано
  None: -1,

  // В процентах
  ByPercent: 0,

  // В сумме
  BySum: 1
};

export const PopupNames = {
  Legal: 'Legal',

  Antivir: 'Antivir',

  TvConsole: 'TvConsole',

  Tv: 'Tv',

  Inet: 'Inet',

  WifiRouter: 'WifiRouter'
};

export const OwnershipType = {
  Unknown: 0,

  // В рассрочку
  ByInstallments: 1,

  // Куплено
  Buyed: 2,

  // Сдано в аренду
  Rented: 3,

  // Подарено
  Gift: 4,

  // Выкуплено
  BuyOut: 5
};

export const AccumulatorPeriodType = {
  None: 0,

  ActiveDays: 1,

  AllDays: 2,

  FullBc: 3,

  AllBc: 4
};

export const InetServiceTypes = {
  U: 'U',

  N: 'N',

  S: 'S',

  L: 'L',

  Shaped: 'Shaped',

  MultiService: 'Multiservice',

  ShapedMultiService: 'shaped-multi-service',

  None: 'none'
};
