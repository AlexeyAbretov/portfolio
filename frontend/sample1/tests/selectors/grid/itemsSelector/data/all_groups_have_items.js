/* eslint-disable */
import { ServiceTypes } from 'consts';

export default {
    presets: [
    {
        id: 'preset2',
        name: 'Preset 2',
        isConnected: true,
        fee: 550,
        services: [{
            id: 'inet1',
            type: ServiceTypes.Internet,
            speed: 100,
            fee: 120,
            discount: 20,
            isRequired: true,
            isPreInclude: false,
            isLineHolder: false
        },
        {
            id: 'tv1',
            type: ServiceTypes.TvTariff,
            fee: 120,
            discount: 20,
            accumulator: 10,
            isRequired: false,
            isPreInclude: false,
            isLineHolder: false
        }]
    },
    {
        id: 'preset3',
        name: 'Preset 3',
        isConnected: true,
        fee: 550,
        services: [{
            id: 'inet1',
            type: ServiceTypes.Internet,
            speed: 100,
            fee: 120,
            discount: 20,
            isRequired: true,
            isPreInclude: false,
            isLineHolder: true
        },
        {
            id: 'tv1',
            type: ServiceTypes.TvTariff,
            fee: 120,
            discount: 20,
            accumulator: 10,
            isRequired: true,
            isPreInclude: false,
            isLineHolder: false
        },
        {
            id: 'inet2',
            type: ServiceTypes.Internet,
            speed: 100,
            fee: 120,
            discount: 20,
            isRequired: true,
            isPreInclude: false,
            isLineHolder: false
        },
        {
            id: 'tv2',
            type: ServiceTypes.TvTariff,
            fee: 120,
            discount: 20,
            accumulator: 10,
            isRequired: true,
            isPreInclude: false,
            isLineHolder: false
        }]
    },
    {
        id: 'preset4',
        name: 'Preset 4',
        isConnected: true,
        fee: 550,
        services: [{
            id: 'inet1',
            type: ServiceTypes.Internet,
            speed: 100,
            fee: 120,
            discount: 20,
            isRequired: true,
            isPreInclude: false,
            isLineHolder: false
        },
        {
            id: 'tv1',
            type: ServiceTypes.TvTariff,
            fee: 120,
            discount: 20,
            accumulator: 10,
            isRequired: true,
            isPreInclude: false,
            isLineHolder: false
        }]
    }]
};
