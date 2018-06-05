/* eslint-disable */

import {
    ServiceTypes,
    SortOrder,
    Groups
} from 'consts';


export default {
    items: [{
        type: ServiceTypes.Kit,
        isConnected: true,
        name: 'Пакет 1',
        url: 'http://ddddd'
    }, {
        type: ServiceTypes.Internet,
        isConnected: false
    }, {
        type: ServiceTypes.TvTariff,
        isConnected: false
    }, {
        type: ServiceTypes.Courier,
        isConnected: false,
        fee: 100
    }]
};
