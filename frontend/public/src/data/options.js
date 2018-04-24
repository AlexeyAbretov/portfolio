/* eslint-disable */
export default {
    title: 'Тарифы для дома',
    infoText: 'Информационный текст <br /> Текст',
    bundleNote: `Текст,
        параметр,
        #name#
        text`,
    note: `Текст`,

    groups: [
        {
            image: 'http://static.assests.ru/upload/images/image1.png',
            title: 'Группа 2',
            code: Groups.Group2
        },
        {
            image: 'http://static.assests.ru/upload/images/image3.png',
            title: 'Группа 1',
            code: Groups.Group1
        },
        {
            image: 'http://static.assests.ru/upload/images/image2.png',
            title: 'Группа 3',
            code: Groups.Group3
        },
    ],

    groupsOrder: [
        Groups.Group1,
        Groups.Group2,
        Groups.Group3
    ],

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

    additionalServicesText: 'с учетом доп. услуг',

    yourTariffText: 'Ваш тариф',
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

    giftIcon: 'http://',

    legalPopupTitle: 'Подробно о "{0}"',

    profileUrl: 'http://localhost:8080/profile/'
};
