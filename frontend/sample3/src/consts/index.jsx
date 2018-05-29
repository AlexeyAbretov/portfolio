// actions

export const MESSAGES_MENU_ITEM_SELECTING = 'MESSAGES_MENU_ITEM_SELECTING';
export const MESSAGES_MENU_ITEM_SELECTED = 'MESSAGES_MENU_ITEM_SELECTED';

export const SET_NOTICES = 'SET_NOTICES';
export const SET_REQUESTS = 'SET_REQUESTS';
export const MARK_NOTICES_AS_READ_REQUESTED = 'MARK_NOTICES_AS_READ_REQUESTED';
export const MARKED_NOTICES_AS_READ = 'MARKED_NOTICES_AS_READ';
export const DELETE_NOTICES_REQUESTED = 'DELETE_NOTICES_REQUESTED';
export const DELETE_NOTICES = 'DELETE_NOTICES';
export const REQUEST_DETAILS_REQUESTED = 'REQUEST_DETAILS_REQUESTED';
export const SET_REQUEST_DETAILS = 'SET_REQUEST_DETAILS';

export const GET_OPERATION_HISTORY = 'GET_OPERATION_HISTORY';
export const GET_PAYMENT_HISTORY = 'GET_PAYMENT_HISTORY';
export const GET_SERVICES_ACTIVITY_HISTORY = 'GET_SERVICES_ACTIVITY_HISTORY';
export const GET_TURBO_BUTTON_HISTORY = 'GET_TURBO_BUTTON_HISTORY';
export const GET_DISCOUNTS_HISTORY = 'GET_DISCOUNTS_HISTORY';
export const GET_INTERNET_HISTORY = 'GET_INTERNET_HISTORY';
export const GET_CALLS_HISTORY = 'GET_CALLS_HISTORY';

// settings
export const GET_SOCIAL_ACCOUNTS = 'GET_SOCIAL_ACCOUNTS';
export const GET_MANAGE_NUMBERS = 'GET_MANAGE_NUMBERS';
export const GET_MANAGE_CREDENTIALS = 'GET_MANAGE_CREDENTIALS';
export const GET_MANAGE_IP_TV = 'GET_MANAGE_IP_TV';
export const GET_SHARED_DATA = 'GET_SHARED_DATA';

export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';
export const DELETE_ACCOUNT_SUCCESS = 'DELETE_ACCOUNT_SUCCESS';
export const CHANGE_DEFAULT_SSO_LOGIN = 'CHANGE_DEFAULT_SSO_LOGIN';
export const CHANGE_DEFAULT_SSO_LOGIN_SUCCESS = 'CHANGE_DEFAULT_SSO_LOGIN_SUCCESS';
export const ENABLE_REQUEST_TO_LINK = 'ENABLE_REQUEST_TO_LINK';
export const ENABLE_REQUEST_TO_LINK_SUCCESS = 'ENABLE_REQUEST_TO_LINK_SUCCESS';

export const CREATE_LINK_REQUEST = 'CREATE_LINK_REQUEST';
export const CREATE_LINK_REQUEST_AWAITER = 'CREATE_LINK_REQUEST_AWAITER';
export const ADD_ACCOUNT_TO_CURRENT = 'ADD_ACCOUNT_TO_CURRENT';
export const ADD_ACCOUNT_TO_CURRENT_AWAITER = 'ADD_ACCOUNT_TO_CURRENT_AWAITER';
export const BLOCK_ACCOUNT = 'BLOCK_ACCOUNT';
export const BLOCK_ACCOUNT_AWAITER = 'BLOCK_ACCOUNT_AWAITER';
export const GET_LOGIN_INFO = 'GET_LOGIN_INFO';
export const GET_LOGIN_INFO_AWAITER = 'GET_LOGIN_INFO_AWAITER';
export const ACCEPT_REQUEST = 'ACCEPT_REQUEST';
export const ACCEPT_REQUEST_AWAITER = 'ACCEPT_REQUEST_AWAITER';
export const REJECT_REQUEST = 'REJECT_REQUEST';
export const REJECT_REQUEST_AWAITER = 'REJECT_REQUEST_AWAITER';
export const CANCEL_REQUEST = 'CANCEL_REQUEST';
export const CANCEL_REQUEST_AWAITER = 'CANCEL_REQUEST_AWAITER';
export const ACCEPT_INVITE = 'ACCEPT_INVITE';
export const ACCEPT_INVITE_AWAITER = 'ACCEPT_INVITE_AWAITER';
export const REJECT_INVITE = 'REJECT_INVITE';
export const REJECT_INVITE_AWAITER = 'REJECT_INVITE_AWAITER';
export const CANCEL_INVITE = 'CANCEL_INVITE';
export const CANCEL_INVITE_AWAITER = 'CANCEL_INVITE_AWAITER';
export const UPDATE_NOTIFICATIONS = 'UPDATE_NOTIFICATIONS';
export const UPDATE_NOTIFICATIONS_AWAITER = 'UPDATE_NOTIFICATIONS_AWAITER';
export const CONFIRM_NOTIFICATION_CODE = 'CONFIRM_NOTIFICATION_CODE';
export const CONFIRM_NOTIFICATION_CODE_AWAITER = 'CONFIRM_NOTIFICATION_CODE_AWAITER';
export const CONFIRM_NOTIFICATION_CODE_RESET_AWAITER = 'CONFIRM_NOTIFICATION_CODE_RESET_AWAITER';
export const SEND_NOTIFICATION_CONFIRM_CODE = 'SEND_NOTIFICATION_CONFIRM_CODE';
export const SEND_NOTIFICATION_CONFIRM_CODE_AWAITER = 'SEND_NOTIFICATION_CONFIRM_CODE_AWAITER';
export const SEND_NOTIFICATION_CONFIRM_CODE_RESET_AWAITER = 'SEND_NOTIFICATION_CONFIRM_CODE_RESET_AWAITER';
export const NOTIFICATIONS_HIDEAWAITER_TOGGLE = 'NOTIFICATIONS_HIDEAWAITER_TOGGLE';
export const CHANGE_MANAGE_IP_TV = 'CHANGE_MANAGE_IP_TV';
export const CHANGE_MANAGE_IP_TV_AWAITER = 'CHANGE_MANAGE_IP_TV_AWAITER';
export const CHANGE_LOGIN = 'CHANGE_LOGIN';
export const CHANGE_LOGIN_AWAITER = 'CHANGE_LOGIN_AWAITER';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CHANGE_PASSWORD_AWAITER = 'CHANGE_PASSWORD_AWAITER';
export const DELETE_SOCIAL_ACCOUNT = 'DELETE_SOCIAL_ACCOUNT';
export const DELETE_SOCIAL_ACCOUNT_AWAITER = 'DELETE_SOCIAL_ACCOUNT_AWAITER';

//
export const SET_DETAILS_FILTER = 'SET_DETAILS_FILTER';

export const TOGGLE_BLOCKING_LINK = 'TOGGLE_BLOCKING_LINK';
export const TOGGLE_BLOCKING_DESCRIPTION = 'TOGGLE_BLOCKING_DESCRIPTION';

// menu names consts

// top menu
export const TOP_MENU_PROFILE_ITEM_ID = 'index';
export const TOP_MENU_DETAILS_ITEM_ID = 'details';
export const TOP_MENU_TV_ITEM_ID = 'tv';
export const TOP_MENU_INTERNET_ITEM_ID = 'internet';
export const TOP_MENU_MESSAGES_ITEM_ID = 'messages';
export const TOP_MENU_SETTINGS_ITEM_ID = 'settings';
export const TOP_MENU_EXIT_ITEM_ID = 'exit';

// details menu
export const DETAILS_MENU_OPERATION_HISTORY_ITEM_ID = 'index';
export const DETAILS_MENU_PAYMENTS_ITEM_ID = 'payments';
export const DETAILS_MENU_SERVICES_ACTIVITY_ITEM_ID = 'services';
export const DETAILS_MENU_CALLS_ITEM_ID = 'calls';
export const DETAILS_MENU_TURBO_BUTTON_ITEM_ID = 'turbo';
export const DETAILS_MENU_DISCOUNTS_ITEM_ID = 'discounts';
export const DETAILS_MENU_INTERNET_ITEM_ID = 'internet';

// settings menu
export const SETTINGS_MENU_MANAGE_NUMBERS_ITEM_ID = 'index';
export const SETTINGS_MENU_NOTIFICATIONS_ITEM_ID = 'notifications';
export const SETTINGS_MENU_MANAGE_CREDENTIALS_ITEM_ID = 'manageCredentials';

// messages
export const MESSAGES_MENU_REQUESTS_ID = 'requests';
export const MESSAGES_MENU_NOTICES_ID = 'notices';

// internet groups
export const INTERNET_GROUP_BY_MONTH_ID = 'byMonth';
export const INTERNET_GROUP_BY_SESSION_ID = 'bySession';

export const CLOSE_MOVE_TICKET_NOTE = 'CLOSE_MOVE_TICKET_NOTE';
export const SHOW_BLOCKING_ACTIONS = 'SHOW_BLOCKING_ACTIONS';
export const CLOSE_COLLECTION_NOTIFICATIONS = 'CLOSE_COLLECTION_NOTIFICATIONS';
export const HIDE_MOVE_REQUEST = 'HIDE_MOVE_REQUEST';
export const TOGGLE_MOVE_REQUEST_AGREE = 'TOGGLE_MOVE_REQUEST_AGREE';
export const HIDE_REISSUE_REQUEST = 'HIDE_REISSUE_REQUEST';

// redux-route
export const SET_NAVIGATION_STATE = 'SET_OPERATION';

export const SWITCH_ACCOUNT = 'SWITCH_ACCOUNT';

// contract
export const IMMEDIATE_PAY_FROM_CUSTOMER_CARD = 'IMMEDIATE_PAY_FROM_CUSTOMER_CARD';
export const IMMEDIATE_PAY_FROM_CUSTOMER_CARD_AWAITER = 'IMMEDIATE_PAY_FROM_CUSTOMER_CARD_AWAITER';
export const IMMEDIATE_PAY_FROM_CUSTOMER_CARD_RESET_AWAITER = 'IMMEDIATE_PAY_FROM_CUSTOMER_CARD_RESET_AWAITER';
export const ACTIVATE_PROMISE_PAYMENT = 'ACTIVATE_PROMISE_PAYMENT';
export const ACTIVATE_PROMISE_PAYMENT_AWAITER = 'ACTIVATE_PROMISE_PAYMENT_AWAITER';
export const ACTIVATE_PROMISE_PAYMENT_RESET_AWAITER = 'ACTIVATE_PROMISE_PAYMENT_RESET_AWAITER';

// address widget
export const CREATE_RELOCATION_REQUEST = 'CREATE_RELOCATION_REQUEST';
export const CREATE_RELOCATION_REQUEST_FAIL = 'CREATE_RELOCATION_REQUEST_FAIL';
export const SHOW_RELOCATION_DIALOG = 'SHOW_RELOCATION_DIALOG';
export const CLOSE_RELOCATION_DIALOG = 'CLOSE_RELOCATION_DIALOG';
export const FETCH_STREETS = 'GET_STREETS';
export const FETCH_STREETS_SUCCESS = 'FETCH_STREETS_SUCCESS';
export const FETCH_HOUSES = 'FETCH_HOUSES';
export const FETCH_HOUSES_SUCCESS = 'FETCH_HOUSES_SUCCESS';

export const DateFormats = {
  FullDateWithTime: 'DD MMMM YYYY, HH:mm',
  FullDateWithTimeWithDots: 'DD.MM.YYYY HH:mm',
  FullDateWithTimeWithComma: 'DD.MM.YYYY, HH:mm',
  DayNumberMonth: 'D MMMM',
  DayNumberMonthWithTime: 'D MMMM в HH:mm',
  MonthYear: 'MMMM YYYY',
  TimeDayYear: 'HH:mm D MMMM',
  FullDate: 'DD.MM.YYYY'
}
  ;

export const NumFormats = {
  FixedTwoSymbols: '0.00',
  FixedHideZero: '0.[00]',
  Mb: '0.0 МБ',
  Time: 'врм'
}
  ;

export const Locales = {
  Ru: 'ru',
  En: 'us'
}
;

export const DateMeasure = {
  Day: 'd',
  Month: 'M'
}
;

export const DataTypes = {
  String: 'string',
  DateTime: 'date',
  Numeric: 'num'
};

export const SortDirection = {
  Ascending: 'Ascending',
  Descending: 'Descending'
}
  ;

export const FttbAccountStatus = {
  Active: 0,
  FinBlock: 1,
  Collection: 6,

  // ???
  WaitingForBlock: 1000,

  VoluntaryBlock: 2,
  AdministrativeBlock: 4,
  RegistrationBlock: 3,

  // ???
  RescissionBlock: 2000
};

export const UserType = {
  Convergent: 'Convergent',
  Fttb: 'Fttb',
  Mobile: 'Mobile',
  Anonymouse: 'Anonymouse',
  SubConvergent: 'SubConvergent'
};

export const CallType = {
  None: -1,
  OutcomingCall: 0,
  Sms: 1,
  NumberChange: 2,
  Renewal: 3,
  NumberRestore: 4,
  IncomingCall: 5
};

export const TvPacketTypes = {
  // Базовый пакет
  Base: 'BASE_PACKET',

  // / Тип пкаета (тематические, преимальные)
  Packet: 'PACKET_TYPE',

  // Подтип
  Sub: 'PACKET_SUB_TYPE',

  // Конкретный пакет
  Concrete: 'CONCRETE_PACKET',

  // Неизвестный тип
  Uncknow: 'UNKNOWN'
};

export const CallTypeNames = {
  None: '',
  OutcomingCall: 'Исходящий вызов',
  Sms: 'SMS',
  NumberChange: 'Замена номера',
  Renewal: 'Переоформление',
  NumberRestore: 'Восстановление номера',
  IncomingCall: 'Входящий вызов'
};

// Типы операций
export const OperationHistoryTypes = {
  // Активация доверительного платежа
  _1: '1000',

  // Отмена доверительного платежа
  _2: '2000',

  // Платёж
  Payment: '3000',

  // Компенсация
  Compensation: '3500',

  //  Частичное погашение доверительного платежа
  _4: '4000',

  // Полное погашение доверительного платежа
  // Списание доверительного платежа за неуплату
  _5: '5000',

  // Начало услуги
  _6: '6000',

  // Резервирование средств
  Reserve: '7000',

  // Возврат резерва
  ReturnReserve: '8000',

  // Списание средств
  Fee: '9000',

  // Списание за видеопрокат
  _91: '9100',

  // Списание за VOD
  _92: '9200',

  // Разовые списания
  OneTimePayment: '9300',

  // Окончание услуги
  _10: '10000',

  // Старые списания
  _11: '11000'
};

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

  // Возврат эфира
  ReturnEther: 130,
};

export const FeePeriod = {
  InDay: 1,

  InMonth: 30,

  InWeek: 7,

  InYear: 365
};

// Типы продуктов
export const ProductTypes = {
  None: 0,

  Tv: 1,

  MobileTv: 2,

  Internet: 3,

  Phone: 4,

  Kit: 5,

  Service: 6,

  Action: 7,

  Equipment: 8
};

// Типы статусов платежа
export const PaymentStatus = {
  Accept: 1
};

// типы состояния операций
export const OperationStatus = {
  Default: 0,
  Pending: 1,
  Success: 2,
  Fail: 3,
  CustomError: 4
};

export const AccountType = {
  Home: 1,
  Mobile: 0
};

// Статус уведомления
export const UserNotificationStatus = {
  New: 0,
  Unread: 1,
  Read: 2,
  Delete: 3,
  Unknown: 4
};

export const SocTypes = {
  // Не определен
  Undefined: 0,

  // услуга

  Service: 1,

  // тариф

  Tariff: 2,

  // акция

  PromotionСampaign: 3,

  // оборудование
  Hardware: 4,

  // Предложение FTTB для Mobile
  FttbOfferForMobile: 5,

  PostTariff: 9,

  Convergent: 10
};

export const SocServiceTypes = {
  // Неопределен
  Undefined: 0,

  //  – «Тариф Домашнего интернета»
  VPDN: 1,

  // - «Тариф Цифрового ТВ»
  IPTV_TARIFF_ENTITY: 2,

  // – «Доп. пакет Цифрового ТВ»
  IPTV_PACKET_ENTITY: 3,

  // – «Подписка видеопроката»
  IPTV_SUBSCRIPTION: 4,

  //  – «Услуга»
  IPTV_BROADCAST_RETURN: 5,

  //  – «Платный возврат оборудования ТВ»
  IPTV_PAID_COURIER_CALL: 6,

  //  – «Пакетное предложение»
  BUNDLE: 7,

  //  – «Тариф мобильной связи»
  MOBILE_PACKAGE: 8,

  //  – «Годовой контракт»
  ANNUAL_CONTRACT: 9,

  // Выбор скорости
  VSU_SERVICE: 10,

  // Турбо-кнопка
  TURBO_BUTTON: 11,

  // Eset
  ESET: 12,

  // Касперский
  KASPER: 13,

  // Dr. Web
  DR_WEB: 14
};

export const OwnerShipType = {
  Rent: 'R',
  Buy: 'B'
};

export const OwnerShipNames = {
  Rent: 'Арендованный',
  Buy: 'Куплен',
  Installment: 'В рассрочке'
};

export const BackwardCompatibility = {
  Profile: {
    Name: TOP_MENU_PROFILE_ITEM_ID,
    Index: TOP_MENU_PROFILE_ITEM_ID
  },

  Detalization: {
    Name: TOP_MENU_DETAILS_ITEM_ID,

    Index: DETAILS_MENU_OPERATION_HISTORY_ITEM_ID,

    Payment: DETAILS_MENU_PAYMENTS_ITEM_ID,

    Service: DETAILS_MENU_SERVICES_ACTIVITY_ITEM_ID,

    NP: DETAILS_MENU_CALLS_ITEM_ID,

    TurboButton: DETAILS_MENU_TURBO_BUTTON_ITEM_ID,

    Compensation: DETAILS_MENU_DISCOUNTS_ITEM_ID,

    Internet: DETAILS_MENU_INTERNET_ITEM_ID
  },

  Messages: {
    Name: TOP_MENU_MESSAGES_ITEM_ID,

    Requests: MESSAGES_MENU_REQUESTS_ID,

    Notifications: MESSAGES_MENU_NOTICES_ID
  },

  Settings: {
    Name: TOP_MENU_SETTINGS_ITEM_ID,

    Index: SETTINGS_MENU_MANAGE_NUMBERS_ITEM_ID,

    Notifications: SETTINGS_MENU_NOTIFICATIONS_ITEM_ID,

    ManageCredentials: SETTINGS_MENU_MANAGE_CREDENTIALS_ITEM_ID
  }
};

export const RedirectLinks = {
  ReconfigureConnection: 27,
  VkBalance: 23,
  FbBalance: 24,
  SocNetworkUrlFb: 16,
  SocNetworkUrlVk: 17
};

export const SocialType = {
  VK: 'VK',
  FB: 'FB'
};

export const NotificationChannelType = {
  SMS: 0,
  EMAIL: 1
};

export const LoginInfoType = {
  UNKNOWN: 0,
  B2B: 1,
  B2C: 2,
  FTTB: 3,
  ADMIN: 4
};

export const PopupsNames = {
  Tv: {
    Change: 'Tv/Change',
    Packages: {
      Change: 'Tv/Packages/Change'
    }
  }
};

export const ActivityNames = {
  Tv: {
    ToggleChangeBlock: 'Tv/ToggleChangeBlock'
  }
};

export const UssErrorType = {
  SUCCESS: 20000,
  INVALID_QUERY_PARAM: 20001,
  AUTH_ERROR: 20002,
  TOKEN_NOT_FOUND: 20003,
  TOKEN_EXPIRED: 20004,
  CTN_NOT_FOUND: 20005,
  FORBIDDEN: 20006,
  INVALID_SYSTEM_HASH: 20007,
  OFFER_VALIDATION_ERROR: 20008,
  CTN_BLOCKED: 20009,
  CTN_PP_FUTURE_TRX: 20010,
  BILL_DETAIL_NOTIFY_DISABLED: 20011,
  BILL_DETAIL_NOTIFY_EMAIL_NOT_SET: 20012,
  BILL_DETAIL_NOTIFY_EMAIL_NOT_CONFIRMED: 20013,
  AUTH_USER_BLOCKED_ERROR: 20014,
  AUTH_EXPIRED_PASSWORD_ERROR: 20015,
  AUTH_ABANDONBO_ERROR: 20016,
  BAD_REQUEST_STATUS: 20017,
  BAD_REQUEST_TYPE: 20018,
  INCORRECT_CONFIRMATION_CODE: 20019,
  NOTHING_TO_CONFIRM_ERROR: 20020,
  CHANNEL_VALUE_CHANGED: 20021,
  SEND_CONFIRMATION_CODE_ERROR: 20022,
  CHANNEL_ALREADY_CONFIRMED: 20023,
  INCORRECT_STATUS_FOR_OPERATION: 20024,
  BILLING_ERROR: 20025,
  REG_RESTRICT_ERROR: 20026,
  REG_ENSEMBLE_REG_ERROR: 20027,
  ABONENTS_NOT_FOUND: 20028,
  USER_NOT_FOUND_IN_INAC: 20029,
  REQUEST_STATUS_INTERMEDIATE: 20030,
  EXIST_ADDITIONAL_NUMBER: 20035,
  DIFFERENT_REGIONS_ABONENT: 20036,
  SOC_NOT_AVAILABLE: 20037,
  NEED_MODIFY_SOC: 20038,
  SHARED_INTERNET_MAX_USERS: 20039,
  BAD_BALANCE_FOR_SHARED: 20040,
  NO_SOCIAL_LINK: 20041,
  SOCIAL_LINK_ALREADY_EXIST: 20042,
  INITIATOR_ACCOUNT_NOT_FOUND: 20043,
  LINKAGE_FORBIDDEN: 20044,
  LINKABLE_ACCOUNT_IS_BLOCKED: 20045,
  BASE_ACCOUNT_LINKAGE_NOT_ENABLED: 20046,
  ALREADY_LINKED: 20047,
  LINKAGE_REQUEST_ALREADY_EXISTS: 20048,
  LINKABLE_ACCOUNT_NOT_FOUND: 20049,
  TOO_MANY_OUTCOMING_LINKAGE_REQUESTS: 20050,
  INVITE_REQUEST_ALREADY_EXISTS: 20051,
  ALREADY_INVITED: 20052,
  INVALID_LINKABLE_ACCOUNT_HIERARCHY: 20053,
  WRONG_LINKABLE_ACCOUNT_PASSWORD: 20054,
  NO_CONNECTED_BANK_CARD_FOUND: 20055,
  INAC_MTOPUP_CARD_ALREADY_EXISTS: 20056,
  WRONG_LINKABLE_LOGIN_FORMAT: 20057,
  SSO_LINKAGE_SMS_TOKEN_NOT_FOUND: 20058,
  SSO_LINKAGE_SMS_TOKEN_EXPIRED: 20059,
  EXCESS_NUMBER_INVITED_FTTB_CTNS: 20060,
  USER_NOT_FOUND_BY_CONTACT_DATA: 20061,
  MANY_USER_FOUND_BY_CONTACT_DATA: 20062,
  SSO_LINKED_ACCOUNT_NOT_FOUND: 20063,
  INITIATOR_ACCOUNT_INVALID_HIERARCHY: 20064,
  ALIAS_ALREADY_EXISTS: 20068,
  WRONG_BLOCK_DATE: 20082,
  WRONG_BLOCK_DAYS: 20083,
  FTTB_ACTIVE_REQUEST_EXISTS: 20092,
  ACTIVE_PROMISED_PAYMENT: 20130,
  EXT_SYSTEM_ERROR: 49999,
  SYSTEM_ERROR: 50000,
};

export const UssErrorMessages = {};
UssErrorMessages[UssErrorType.AUTH_ERROR] = 'Текущий пароль указан неверно. Изменения не сохранены';
UssErrorMessages[UssErrorType.CTN_BLOCKED] = 'Номер заблокирован';
UssErrorMessages[UssErrorType.CTN_NOT_FOUND] = 'Номер не найден';
UssErrorMessages[UssErrorType.OFFER_VALIDATION_ERROR] = 'Операции с услугами в данный момент недоступны';
UssErrorMessages[UssErrorType.CTN_PP_FUTURE_TRX] = 'Имеется запрос на смену тарифного плана';
UssErrorMessages[UssErrorType.REG_ENSEMBLE_REG_ERROR] = 'Контракт не зарегистрирован';
UssErrorMessages[UssErrorType.LINKABLE_ACCOUNT_IS_BLOCKED] = 'Указанный пользователь заблокирован';
UssErrorMessages[UssErrorType.LINKAGE_REQUEST_ALREADY_EXISTS] =
  'Вы уже отправляли запрос на управление услугами этого пользователя';
UssErrorMessages[UssErrorType.INVITE_REQUEST_ALREADY_EXISTS] =
  'Вы уже отправляли приглашение на управление услугами этому пользователю';
UssErrorMessages[UssErrorType.LINKABLE_ACCOUNT_NOT_FOUND] =
  'Пользователь не найден. Пожалуйста,  проверьте правильность ввода данных';
UssErrorMessages[UssErrorType.WRONG_LINKABLE_ACCOUNT_PASSWORD] = 'Вы ввели неправильный пароль';
UssErrorMessages[UssErrorType.LINKAGE_FORBIDDEN] = 'Привязываемый аккаунт запретил привязки';
UssErrorMessages[UssErrorType.BASE_ACCOUNT_LINKAGE_NOT_ENABLED] = 'Невозможно привязать самого себя';
UssErrorMessages[UssErrorType.ALREADY_INVITED] = 'Привязываемый аккаунт уже управляет Вашими услугами';
UssErrorMessages[UssErrorType.INITIATOR_ACCOUNT_INVALID_HIERARCHY] = 'Данный аккаунт навозможно привязать';
UssErrorMessages[UssErrorType.TOO_MANY_OUTCOMING_LINKAGE_REQUESTS] =
  'Мы ещё обрабатываем ваши предыдущие запросы. Пожалуйста,  повторите через 15 минут';
UssErrorMessages[UssErrorType.ALREADY_LINKED] = 'Вы уже можете управлять услугами этого пользователя';
UssErrorMessages[UssErrorType.SSO_LINKAGE_SMS_TOKEN_NOT_FOUND] = 'Неправильно введён код';
UssErrorMessages[UssErrorType.SSO_LINKAGE_SMS_TOKEN_EXPIRED] = 'Необходимо полуить код по SMS повторно';
UssErrorMessages[UssErrorType.ALIAS_ALREADY_EXISTS] = 'Такой логин уже занят. Пожалуйста, выберите другой';
UssErrorMessages[UssErrorType.USER_NOT_FOUND_IN_INAC] = 'Абонент не существует';
UssErrorMessages[UssErrorType.WRONG_BLOCK_DATE] =
  'Заблокировать договор с указанной даты нельзя,  так как с момента последней разблокировки прошло менее 30 дней';
UssErrorMessages[UssErrorType.AUTH_USER_BLOCKED_ERROR] = 'Операция недоступна для заблокированного пользователя';
UssErrorMessages[UssErrorType.FTTB_ACTIVE_REQUEST_EXISTS] =
  'Мы ещё обрабатываем ваш предыдущий запрос. Пожалуйста, дождитесь уведомления о его исполнении и повторите попытку.';
UssErrorMessages[UssErrorType.WRONG_BLOCK_DAYS] = 'Неправильное количество дней блокировки';
UssErrorMessages[UssErrorType.ACTIVE_PROMISED_PAYMENT] = 'Операция недоступна, у вас уже взят доверительный платеж';
