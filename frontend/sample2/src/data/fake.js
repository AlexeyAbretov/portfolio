import {
    FormState,
    CheckState
} from 'consts';

export default {
    settings: {
        title: 'Подключите Домашний интернет за 0 рублей',
        subTitle: 'Укажите ваш адрес и контактный номер телефона',
        successContent: `<h1 class="heading-large shpd-lite-request_tnx-page-heading">Супер <img src="../../../../../../App_Themes/company/img/icon-like@X2.png" alt="like"></h1><div class="shpd-lite-request_sub-title">
        Заявка №XXXX успешно принята. Мы перезвоним вам в течение двух часов.
        </div>`,
        failContent: '<h1 class="heading-large shpd-lite-request_tnx-page-heading">Не Супер</h1>',
        catalogUrl: 'https://moskva.test.companydev.ru/customers/products/home-landing/home-catalogg/',
        phoneFieldTitle: 'Номер телефона',
        checkResultText: 'По вашему адресу не доступно подключение Домашнего интернета Билайн :(',
        checkFlatResultText: 'В вашей квартире не доступно подключение Домашнего интернета Билайн :(',
        streetsFieldTitle: 'Улица в городе:',
        housesFieldTitle: 'Дом',
        flatFieldTitle: 'Квартира',
        background: `<div class="shpd-lite-request_bg-image shpd-lite-request_bg-image__before">
        <img src="../../../../../../App_Themes/company/img/shpd-lite-request-bg-1.jpg" alt="bg-image" />
      </div>
      <div class="shpd-lite-request_bg-image shpd-lite-request_bg-image__after">
        <img src="../../../../../../App_Themes/company/img/shpd-lite-request-bg-2.jpg" alt="bg-image" />
      </div>`
    },

    focusState: null,

    regions: [{
        id: 1,
        title: 'Москва'
    },
    {
        id: 2,
        title: 'Тула'
    },
    {
        id: 3,
        title: 'Санкт-Петербург'
    },
    {
        id: 4,
        title: 'Омск'
    },
    {
        id: 5,
        title: 'Новосибирск'
    },
    {
        id: 6,
        title: 'Красноярск'
    },
    {
        id: 7,
        title: 'Ярославль'
    },
    {
        id: 8,
        title: 'Брянск'
    },
    {
        id: 9,
        title: 'Казань'
    },
    {
        id: 10,
        title: 'Волгоград'
    },
    {
        id: 11,
        title: 'Воронеж'
    },
    {
        id: 12,
        title: 'Сочи'
    },
    {
        id: 13,
        title: 'Новокузнецк'
    },
    {
        id: 14,
        title: 'Новокузнецк14'
    },
    {
        id: 15,
        title: 'Новокузнецк15'
    },
    {
        id: 16,
        title: 'Новокузнецк16'
    },
    {
        id: 17,
        title: 'Новокузнецк17'
    },
    {
        id: 18,
        title: 'Новокузнецк18'
    },
    {
        id: 19,
        title: 'Новокузнецк19'
    },
    {
        id: 199,
        title: 'Новокузнецк199'
    },
    {
        id: 13999,
        title: 'Новокузнецк13999'
    },
    {
        id: 139999,
        title: 'Новокузнецк139999'
    },
    {
        id: 13999999,
        title: 'Новокузнецк13999999'
    },
    {
        id: 1311111,
        title: 'Новокузнецк1311111'
    },
    {
        id: 1322222,
        title: 'Новокузнецк1322222'
    },
    {
        id: 13222221,
        title: 'Новокузнецк132222221'
    }],
    streets: [],
    houses: [],

    selected: {
        regionTitle: 'Москва',
        regionId: 1,

        streetId: null,
        streetTitle: null,
        houseId: null,
        houseTitle: null,

        flat: null,

        phone: null
    },

    formState: FormState.Default,
    checkState: CheckState.Success,

    isFormValid: false,
    requestId: null
};