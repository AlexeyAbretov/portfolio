export default {
  balanceText: 'Баланс',
  feeText: 'Абон. плата',
  nextPayText: 'К оплате',
  nextPayDateText: 'Оплатить до',
  statusText: 'Статус',
  tariffLinkText: 'Ваш тариф',
  blockLinkText: 'Заблокировать номер',

  menu: {
    profile: 'Профиль',
    details: 'Детализация',
    messages: 'Сообщения',
    settings: 'Настройки',
    exit: 'Выйти',
    myVendor: 'Мой Билайн',
    internet: 'Домашний интернет',
    tv: 'Телевидение'
  },

  banners: [
    '<div className="lk-banner-zone__banner">Left</div>',
    '<div className="lk-banner-zone__banner">Right</div>'
  ],

  statusValueTexts: {
    status0: 'Активен',
    status1: 'Финансовая блокировка',
    status2: 'Добровольная блокировка',
    status3: 'Блокировка при регистрации - новый абонент',
    status4: 'Административная блокировка',
    status5: 'Блокировка при расторжении контракта - ЛК недоступен',
    status6: 'Collection'
  },

  internetTitle: 'Домашний интернет',
  internetInSpeedText: 'Входящая',
  internetOutSpeedText: 'Исходящая',
  additionalServicesText: 'Доп. услуги',
  internetDescription: 'NEW_SHPD_PROFILE_SPEED_TEXT',
  additionalServicesWordForms: {
    rusFirstPlural: '{0} доп. услуга',
    rusSecondPlural: '{0} доп. услуги',
    rusThirdPlural: '{0} доп. услуг',
  },
  internetSpeedUpText: 'Увеличить скорость',
  addMoreServicesText: 'Подключить больше услуг',

  speedUpTitle: 'Услуга "Увеличение скорости"',
  speedUpCurrentText: 'Текущая скорость',
  speedUpSmallText: 'Входящая скорость, которую вы хотите получить',

  contactsTitle: 'Ваши контакты',
  phoneText: 'Телефон',
  emailText: 'Email',
  changePhoneLinkText: 'Изменить номер телефона',
  addEmailLinkText: 'Добавить электронную почту',
  сhangeEmailLinkText: 'Изменить email',

  addressTitle: 'Адрес подключения',
  addressChangeLinkText: 'Изменить адрес',
  addressCancelLinkText: 'Отменить переезд',
  addressApproveLinkText: 'Подтвердить переезд',
  addressMoveNote: 'Заказан переезд. <br /> Время - {0}.',

  phoneStatusTexts: {
    verified: 'Подтвержден',
    notVerified: 'Подтвердить'
  },
  emailStatusTexts: {
    verified: 'Подтвержден',
    notVerified: 'Подтвердить'
  },

  phoneStatusNote: 'NEW_SHPD_PROFILE_CONFIRM_PHONE_HELP',
  emailStatusNote: 'NEW_SHPD_PROFILE_CONFIRM_EMAIL_HELP',

  tvTitle: 'Телевидение',
  tvChannelsText: 'Каналы',
  tvSubscrptionsText: 'Подписки',
  tvEquipmentsText: 'Устройства',
  tvEquipmentsValueText: '{0} из {1}',
  addChannelsLinkText: 'Подключить ещё каналы',
  addEquipmentsLinkText: 'Подключить больше устройств',
  tvChannelsWordForms: {
    rusFirstPlural: '{0} канал',
    rusSecondPlural: '{0} канала',
    rusThirdPlural: '{0} каналов',
  },
  tvSubscriptionsWordForms: {
    rusFirstPlural: '{0} ТВ-подписка',
    rusSecondPlural: '{0} ТВ-подписки',
    rusThirdPlural: '{0} ТВ-подписок',
  },

  multiroomText: 'Мультирум',

  routerTypeText: 'Роутер',
  macAddressText: 'MAC-адрес:',
  serialText: 'Серийный номер роутера:',
  returnRouterButtonText: 'Вернуть роутер',
  installmentText: 'Окончание платежа через',

  paymentTitle: 'Оплата',
  paymentNote: 'Без комисси с банковской карты',
  paymentSumNote: 'От 100 Р',
  paymentIcons: [
    'http://static.vendordev.ru/upload/images/home/profile/mir.png',
    'http://static.vendordev.ru/upload/images/home/profile/visa.png',
    'http://static.vendordev.ru/upload/images/home/profile/mastercard.png'
  ],
  paymentButtonText: 'Пополнить',
  paymentTypesText: 'Все способы оплаты',
  paymentTypesUrl: '/customers/products/how-to-pay/',
  paymentCardNumberText: 'Номер карты',
  promisePaymentNote: 'Взят <a href="#!">доверительный платеж</a>. <br /> К оплате до {0} {1} {2}. <br /> {3}',
  promisePaymentLinkText: 'Доверительный платеж',
  promisePaymentLeftDaysWordForms: {
    rusFirstPlural: 'Остался {0} день',
    rusSecondPlural: 'Осталось {0} дня',
    rusThirdPlural: 'Осталось {0} дней',
  },

  rubSymbol: '₽',
  tariffText: 'Тариф',
  additionalServicesTitle: 'Дополнительные услуги',
  changeTariffLinkText: 'Изменить тариф',
  connectTariffLinkText: 'Подключить тариф',
  consoleText: 'Приставка',
  additionalConsoleText: 'Дополнительная ТВ-приставка',
  rentText: 'В аренде',
  buyText: 'Куплена',
  toText: 'До',
  zeroPriceText: '0 р',
  mbPerSecondText: 'Мбит/с',
  perMonthText: 'в месяц',
  monthText: 'месяц',
  saveButtonText: 'Сохранить',
  paymentResultTexts: {
    success: 'Оплата прошла успешно',
    fail: 'Что-то пошло не так'
  },
  paymentPopupButtonOkText: 'Подтвердить',
  paymentPopupButtonCancelText: 'Отмена',
  paymentPopupText: 'Подтверждение списания средств с карты',
  promisePaymentResultTexts: {
    success: 'Доверительный платеж активирован',
    fail: 'Что-то пошло не так'
  },
  promisePaymentPopupButtonOkText: 'Подтвердить',
  promisePaymentPopupButtonCancelText: 'Отмена',
  promisePaymentPopupText: 'Подтверждение активации доверительного платежа',

  internetAddServicePopupTitle: 'Подключение услуги',
  internetAddServicePopupDescription: {
    description: 'Общая абонентская плата',
    increase: 'увеличится до',
    decrease: 'уменьшится до'
  },
  internetAddServicePopupSaveText: 'Подключить',
  internetRemoveServicePopupSaveText: 'Отключить',
  internetUpspeedPopupBenefit: 'Без проблем позволит максимально увеличить скорость вашего тарифного плана в ' +
    'любое время без смены текущего тарифного плана. Стоимость услуги 60 руб./мес. за каждый шаг в 50 Мбит/с.',
  internetChangetariffPopupTitle: 'Переход на новый тариф',
  internetChangetariffPopupDescription: {
    description: 'Общая абонентская плата за интернет',
    increase: 'увеличится до',
    decrease: 'уменьшится до'
  },
  internetChangetariffPopupSaveText: 'Перейти на новый тариф',
  internetChangeTariffResultTexts: {
    success: 'Переход на новый тариф прошел успешно',
    fail: 'Что-то пошло не так'
  },
  internetChangeServiceResultTexts: {
    success: 'Список подключенных доп. услуг изменен',
    fail: 'Что-то пошло не так'
  },
  internetSpeedUpResultTexts: {
    success: 'Услуга "увеличение скорости" изменена успешно',
    fail: 'Что-то пошло не так'
  },

  tvChangePackagesPopupTitle: 'Подключение пакетов каналов',
  tvChangePackagesPopupNote: 'Общая абонентская плата',
  tvChangePackagesPopupOkText: 'Сохранить',
  tvChangePackagesResultTexts: {
    success: 'Список подключенных пакетов каналов изменен',
    fail: 'Что-то пошло не так'
  },
  tvChangeTariffPopupTitle: 'Переход на новый тариф',
  tvChangeTariffPopupNote: 'Общая абонентская плата',
  tvChangeTariffPopupOkText: 'Перейти на новый тариф',
  tvChangeTariffResultTexts: {
    success: 'Переход на новый тариф прошел успешно',
    fail: 'Что-то пошло не так'
  },

  phoneConfirmResultTexts: {
    success: 'Телефон подтвержден успешно',
    fail: 'Что-то пошло не так',
    codeFail: 'Код неверен'
  },
  phoneConfirmPopupText: 'Подтверждение номера',
  phoneConfirmPopupSendText: 'Выслать код еще раз',
  phoneConfirmPopupConfirmText: 'Подтвердить номер',
  phoneConfirmPopupDescriptionText: 'Введите код, который мы отправили на номер {phone}' +
    ', для того, чтобы получать новости об изменениях в вашем тарифе',
  emailConfirmResultTexts: {
    success: 'Email подтвержден успешно',
    fail: 'Что-то пошло не так',
    codeFail: 'Код неверен'
  },
  emailConfirmPopupText: 'Подтверждение email',
  emailConfirmPopupSendText: 'Выслать код еще раз',
  emailConfirmPopupConfirmText: 'Подтвердить email',
  emailConfirmPopupDescriptionText: 'Введите код, который мы отправили на email {email}' +
    ', для того, чтобы получать новости об изменениях в вашем тарифе',
};
