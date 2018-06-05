/* eslint-disable */

import {
    ServiceTypes,
    SortOrder,
    Groups
} from 'consts';

export default {
    title: 'Тарифы для дома',
    infoText: 'Информационный текст <br /> Текст на сайте INAC_PRESET_CATALOG_BENEFIT',
    bundleNote: `Текст на сайте INAC_PRESET_CATALOG_BANNER_ABOVE_FOR_BUNDLE,
        параметр GET /inac/service/info/connectedServices . containers . services . ussName,
        {0}
        если параметр пустой или не пришел - использовать technicalName`,
    note: `Текст на сайте INAC_PRESET_CATALOG_BANNER_ABOVE`,

    groups: [
        {
            image: 'http://static.vendordev.ru/upload/images/tvInternetImage.png',
            title: 'Категория интернет + ТВ',
            code: Groups.InetTv
        },
        {
            image: 'http://static.vendordev.ru/upload/images/InternetImage.png',
            title: 'Категория интернет',
            code: Groups.Inet
        },
        {
            image: 'http://static.vendordev.ru/upload/images/tvImage.png',
            title: 'Категория ТВ',
            code: Groups.Tv
        },
    ],

    groupsOrder: [
        Groups.InetTv,
        Groups.Inet,
        Groups.Tv
    ],

    saveChangesText: 'Сохранить изменения',

    rubSymbol: 'P',
    feePeriod: 'ежемесячно',
    mbitsPerSecond: 'Мбит/с',
    rubPerMonth: 'Р/месяц',
    tvChannelsWordForms: {
        rusFirstPlural: '{0} канал',
        rusSecondPlural: '{0} канала',
        rusThirdPlural: '{0} каналов',
    },

    tvConsoleTitle: 'ТВ-приставка',
    tvConsoleWordForms: {
        rusFirstPlural: '{0} приставка',
        rusSecondPlural: '{0} приставки',
        rusThirdPlural: '{0} приставок',
    },
    tvConsoleNoteTitle: 'В каких случаях приставка не нужна',
    tvConsoleNote: `Есть своя Тв-приставка <br />
    <p>Статический HTML
    Текст на сайте INAC_PRESET_CATALOG_TV_CONSOLE_NOTE</p>
    Буду смотреть на смарт тв <br />
    <p>Статический HTML
    Текст на сайте INAC_PRESET_CATALOG_TV_CONSOLE_NOTE</p>`,

    courierServiceText: `Наш курьер привезет приставку на
        указанный адрес после офомления заявки. <br/>
        Стоимость доставки {0}`,

    wifiRentTitle: 'Аренда роутера',

    wifiRouterPopupTitle: 'Wi-Fi роутер',
    wifiRouterPopupDesc: 'Wi-Fi роутер описание - длинное',
    wifiRouterPopupAddButtonTitle: 'Добавить к заказу',
    wifiRouterPopupNextButtonTitle: 'Продолжить работу',
    wifiRouterPopupCancelButtonTitle: 'Отменить изменения',

    wifiRentedStatusText: 'в аренду',
    wifiRentedStatusMappedText: 'в аренде',
    wifiGiftStatusText: 'в подарок',
    wifiGiftStatusMappedText: 'подарен',
    wifiBuyStatusText: 'куплен',
    wifiBuyOutStatusText: 'выкуплен',
    wifiInstallmentStatusText: 'В рассрочку на {0} месяцев',
    wifiInstallmentStatusMappedText: 'Куплен в рассрочку. Дата последнего платежа - {0}',

    antivirusTitle: 'Антивирус',
    phoneTitle: 'ДТЦ',

    additionalServicesText: 'с учетом доп. услуг',

    yourTariffText: 'Подключено',
    orderTariffText: 'Заказать',
    connectTariffText: 'Перейти',
    setupTariffText: 'Настроить',
    moreInfoText: 'О тарифе',

    connectInternetText: '+ Интернет',
    connectTvText: '+ ТВ-каналы',

    connectVsuText: '+ Увеличение скорости',
    connectedVsuText: '+ {0}',

    sortOrder: SortOrder.Desc,

    presetItemsOrder: [
        ServiceTypes.Internet,
        ServiceTypes.TvTariff,
        ServiceTypes.WifiRent,
        ServiceTypes.Eset,
        ServiceTypes.TvConsole,
        ServiceTypes.Vsu
    ],

    giftIcon: 'https://static.vendor.ru/upload/images/emoji/present.svg',

    legalPopupTitle: 'Подробно о тарифе "{0}"',

    profileUrl: 'http://localhost:81/moskva/customers/products/home/profile/'
};
