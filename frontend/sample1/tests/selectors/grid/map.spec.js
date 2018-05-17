/* eslint-disable */

import mapPresets from 'selectors/grid/map';

import {
    ServiceTypes
} from 'consts';

describe('Grid selectors tests', () => {
    const initialState = {
        options: {
            presetItemsOrder: [
                ServiceTypes.Internet,
                ServiceTypes.TvTariff,
                ServiceTypes.WifiRent,
                ServiceTypes.Eset,
                ServiceTypes.TvConsole,
                ServiceTypes.Vsu
            ]
        }
    };

    describe('mapPresets', function () {
        describe('no data', function () {
            it('null/undefined state', () => {
                const state = null;
                const result = mapPresets(state);

                expect(result).not.toBeNull();
                expect(result.length).toBe(0);
            });

            it('null/undefined presets/options', () => {
                const state = {
                    options: null,
                    presets: null
                };
                const result = mapPresets(state);

                expect(result).not.toBeNull();
                expect(result.length).toBe(0);
            });

            it('empty presets/options', () => {
                const state = {
                    options: {
                        presetItemsOrder: [

                        ]
                    },
                    presets: [

                    ]
                };
                const result = mapPresets(state);

                expect(result).not.toBeNull();
                expect(result.length).toBe(0);
            });
        });

        describe('correct data', function () {
            const options = {
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

                additionalServicesText: 'С учетом доп. услуг',

                yourTariffText: 'Ваш тариф',
                connectTariffText: 'Перейти',
                orderTariffText: 'Заказать',
                moreInfoText: 'Подробности',

                connectInternetText: '+ Интернет',
                connectTvText: '+ ТВ-каналы',
                connectedVsuText: '+ {0}',
                connectVsuText: '+ Увеличение скорости',

                giftIcon: ''
            };

            it('default', () => {
                const state = {
                    options: {
                        presetItemsOrder: [

                        ]
                    },
                    presets: [{
                        name: 'Preset 1',
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
                        },
                        {
                            id: 'wifi1',
                            name: 'Wifi-router',
                            type: ServiceTypes.WifiRent,
                            isRequired: true,
                            isPreInclude: false,
                            isLineHolder: false
                        },
                        {
                            id: 'kav1',
                            name: 'Антивирус 1',
                            type: ServiceTypes.Kasper,
                            isRequired: true,
                            isPreInclude: false,
                            isLineHolder: false
                        }]
                    }]
                };

                const result = mapPresets(state);

                expect(result).not.toBeNull();
                expect(result.length).toBe(1);
                expect(result[0].rows).not.toBeUndefined();
                expect(result[0].rows.length).toBe(3);

                expect(result[0].rows).toEqual([
                    { id: 'inet1', status: "Default", image: "", "key": 6, "value": "100 undefined", "type": "Link" },
                    { id: 'wifi1', image: "", "status": "Default", "key": 16, "value": "Wifi-router", "type": "Link" },
                    { id: 'kav1', image: "", "status": "Default", "key": 3, "value": "Антивирус 1", "type": "Link" }]);
            });

            it('custom', () => {
                const state = {
                    options: {
                        presetItemsOrder: [
                            ServiceTypes.WifiRent,
                            ServiceTypes.Eset
                        ]
                    },
                    presets: [{
                        name: 'Preset 1',
                        services: [
                            {
                                id: 'wifi1',
                                name: 'Wifi-router',
                                type: ServiceTypes.WifiRent,
                                isRequired: false,
                                isPreInclude: true,
                                isLineHolder: false
                            },
                            {
                                id: 'kav1',
                                name: 'Антивирус 1',
                                type: ServiceTypes.Kasper,
                                isRequired: false,
                                isPreInclude: true,
                                isLineHolder: false
                            }]
                    }]
                };

                const result = mapPresets(state);

                expect(result).not.toBeNull();
                expect(result.length).toBe(1);
                expect(result[0].rows).not.toBeUndefined();
                expect(result[0].rows.length).toBe(2);

                expect(result[0].rows).toEqual([
                    { id: 'wifi1', image: "", "status": "Default", "key": 16, "value": "Wifi-router", "type": "Link" },
                    { id: 'kav1', image: "", "status": "Default", "key": 3, "value": "Антивирус 1", "type": "Link" }]);
            });

            it('custom - not exists services to bottom', () => {
                const state = {
                    options: {
                        presetItemsOrder: [
                            ServiceTypes.WifiRent,
                            ServiceTypes.Eset
                        ]
                    },
                    presets: [{
                        name: 'Preset 1',
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
                            accumulator: 10
                        },
                        {
                            id: 'wifi1',
                            name: 'Wifi-router',
                            type: ServiceTypes.WifiRent,
                            isRequired: true,
                            isPreInclude: false,
                            isLineHolder: false
                        },
                        {
                            id: 'kav1',
                            name: 'Антивирус 1',
                            type: ServiceTypes.Kasper,
                            isRequired: true,
                            isPreInclude: false,
                            isLineHolder: false
                        }]
                    }]
                };

                const result = mapPresets(state);

                expect(result).not.toBeNull();
                expect(result.length).toBe(1);
                expect(result[0].rows).not.toBeUndefined();
                expect(result[0].rows.length).toBe(3);

                expect(result[0].rows).toEqual([
                    { id: 'wifi1', image: "", "status": "Default", "key": 16, "value": "Wifi-router", "type": "Link" },
                    { id: 'kav1', image: "", "status": "Default", "key": 3, "value": "Антивирус 1", "type": "Link" },
                    { id: 'inet1', image: "", status: "Default", "key": 6, "value": "100 undefined", "type": "Link" }]);
            });

            it('full', () => {
                const state = {
                    options: JSON.parse(JSON.stringify({
                        ...initialState.options,
                        ...options
                    })),
                    presets: [{
                        name: 'Preset 1',
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
                            channels: 100,
                            fee: 120,
                            discount: 20,
                            accumulator: 10,
                            hasGift: true,
                            isRequired: true,
                            isPreInclude: false,
                            isLineHolder: false
                        },
                        {
                            id: 'wifi1',
                            name: 'Wifi-router',
                            type: ServiceTypes.WifiRent,
                            isRequired: true,
                            isPreInclude: false,
                            isLineHolder: false
                        },
                        {
                            id: 'kav1',
                            name: 'Антивирус 1',
                            type: ServiceTypes.Kasper,
                            isRequired: true,
                            isPreInclude: false,
                            isLineHolder: false
                        },
                        {
                            id: 'console1',
                            name: 'Консоль 1',
                            type: ServiceTypes.TvConsole,
                            isRequired: true,
                            isPreInclude: false,
                            isLineHolder: false
                        },
                        {
                            id: 'firewall1',
                            name: 'Firewall 1',
                            type: ServiceTypes.Firewall,
                            isRequired: true,
                            isPreInclude: false,
                            isLineHolder: false
                        }]
                    },
                    {
                        name: 'Preset 2',
                        services: [{
                            id: 'inet1',
                            type: ServiceTypes.Internet,
                            speed: 100,
                            fee: 120,
                            discount: 20,
                            isRequired: true,
                            isPreInclude: false,
                            isLineHolder: false
                        }]
                    },
                    {
                        name: 'Preset 3',
                        services: [{
                            id: 'inet1',
                            type: ServiceTypes.Internet,
                            speed: 100,
                            fee: 120,
                            discount: 20,
                            isRequired: false,
                            isPreInclude: false,
                            isLineHolder: false,
                            isAllow: true
                        },
                        {
                            id: 'tv1',
                            type: ServiceTypes.TvTariff,
                            channels: 100,
                            fee: 120,
                            discount: 20,
                            accumulator: 10,
                            hasGift: false,
                            isRequired: true,
                            isPreInclude: false,
                            isLineHolder: false
                        }]
                    },
                    {
                        name: 'Preset 4',
                        services: [{
                            id: 'inet1',
                            type: ServiceTypes.Internet,
                            speed: 100,
                            fee: 120,
                            discount: 20,
                            isRequired: false,
                            isPreInclude: true,
                            isLineHolder: false,
                            isAllow: false
                        },
                        {
                            id: 'tv1',
                            type: ServiceTypes.TvTariff,
                            channels: 100,
                            fee: 120,
                            discount: 20,
                            accumulator: 10,
                            hasGift: false,
                            isRequired: false,
                            isPreInclude: false,
                            isLineHolder: false,
                            isAllow: true
                        },
                        {
                            id: 'vsu1',
                            name: 'vsu1 name',
                            type: ServiceTypes.Vsu,
                            fee: 120,
                            isRequired: false,
                            isPreInclude: false,
                            isLineHolder: false,
                            isAllow: true,
                            isConnected: false,
                            speedUp: 40,
                            maxSpeed: 300
                        },
                        {
                            id: 'vsu2',
                            name: 'vsu2 name',
                            type: ServiceTypes.Vsu,
                            fee: 120,
                            isRequired: false,
                            isPreInclude: false,
                            isLineHolder: false,
                            isAllow: true,
                            isConnected: false,
                            speedUp: 60,
                            maxSpeed: 300
                        }]
                    },
                    {
                        name: 'Preset 5',
                        isConnected: true,
                        services: [{
                            id: 'inet1',
                            type: ServiceTypes.Internet,
                            speed: 100,
                            fee: 120,
                            discount: 20,
                            isRequired: false,
                            isPreInclude: true,
                            isLineHolder: false,
                            isAllow: false,
                            isConnected: true
                        },
                        {
                            id: 'tv1',
                            type: ServiceTypes.TvTariff,
                            channels: 100,
                            fee: 120,
                            discount: 20,
                            accumulator: 10,
                            hasGift: false,
                            isRequired: false,
                            isPreInclude: false,
                            isLineHolder: false,
                            isAllow: true
                        },
                        {
                            id: 'vsu1',
                            name: 'vsu1 name',
                            type: ServiceTypes.Vsu,
                            fee: 120,
                            isRequired: false,
                            isPreInclude: false,
                            isLineHolder: false,
                            isAllow: true,
                            isConnected: true,
                            speedUp: 40
                        }]
                    },
                    {
                        name: 'Preset 6',
                        services: [{
                            id: 'inet1',
                            type: ServiceTypes.Internet,
                            speed: 100,
                            fee: 120,
                            discount: 20,
                            isRequired: false,
                            isPreInclude: true,
                            isLineHolder: false,
                            isAllow: false
                        },
                        {
                            id: 'tv1',
                            type: ServiceTypes.TvTariff,
                            channels: 100,
                            fee: 120,
                            discount: 20,
                            accumulator: 10,
                            hasGift: false,
                            isRequired: false,
                            isPreInclude: false,
                            isLineHolder: false,
                            isAllow: true
                        },
                        {
                            id: 'vsu1',
                            name: 'vsu1 name',
                            type: ServiceTypes.Vsu,
                            fee: 120,
                            isRequired: false,
                            isPreInclude: false,
                            isLineHolder: false,
                            isAllow: true,
                            isConnected: false,
                            speedUp: 40,
                            maxSpeed: 120
                        },
                        {
                            id: 'vsu2',
                            name: 'vsu2 name',
                            type: ServiceTypes.Vsu,
                            fee: 120,
                            isRequired: false,
                            isPreInclude: false,
                            isLineHolder: false,
                            isAllow: true,
                            isConnected: false,
                            speedUp: 60,
                            maxSpeed: 120
                        }]
                    }]
                };

                const result = mapPresets(state);

                expect(result).not.toBeNull();
                expect(result.length).toBe(6);
                expect(result[0].rows).not.toBeUndefined();
                expect(result[0].rows.length).toBe(6);

                expect(result[0].rows).toEqual([
                    { id: 'inet1', "status": "Default", image: "", "key": 6, "value": `100 ${options.mbitsPerSecond}`, "type": "Link" },
                    {
                        id: 'tv1', "key": 14, "value": `100 каналов`,
                        status: "Default",
                        image: "", "type": "Link"
                    },
                    {
                        id: 'wifi1',
                        "status": "Default", image: "",
                        "key": 16, "value": "Wifi-router", "type": "Link"
                    },
                    { id: 'kav1', image: "", "status": "Default", "key": 3, "value": "Антивирус 1", "type": "Link" },
                    { id: 'console1', "status": "Default", image: "", "key": 17, "value": options.tvConsoleTitle, "type": "Link" },
                    { id: 'firewall1', "status": "Default", image: "", "key": 10, "value": 'Firewall 1', "type": "Inline" }]);

                expect(result[1].rows).toEqual([
                    {
                        id: 'inet1',
                        "status": "Default", image: "",
                        "key": 6,
                        "value": `100 ${options.mbitsPerSecond}`,
                        "type": "Link"
                    },]);

                expect(result[2].rows).toEqual([
                    {
                        id: 'inet1',
                        status: "Allow", image: "",
                        "key": 6,
                        "value": state.options.connectInternetText,
                        "type": "Link"
                    },
                    {
                        id: 'tv1', "key": 14, "value": `100 каналов`,
                        status: "Default", image: '', "type": "Link"
                    }]);

                expect(result[3].rows).toEqual([
                    {
                        id: 'inet1',
                        status: "Default", image: "",
                        "key": 6,
                        "value": `100 ${options.mbitsPerSecond}`,
                        "type": "Link"
                    },
                    {
                        id: 'tv1', "key": 14, "value": state.options.connectTvText,
                        status: "Allow", image: '', "type": "Link"
                    },
                    {
                        id: 'vsu1', "key": 13, "value": options.connectVsuText,
                        status: "Allow", image: '', "type": "Link"
                    }]);

                expect(result[4].rows).toEqual([
                    {
                        id: 'inet1',
                        status: "Connected", image: "",
                        "key": 6,
                        "value": `100 ${options.mbitsPerSecond}`,
                        "type": "Inline"
                    },
                    {
                        id: 'vsu1', "key": 13, "value": '+ 40 Мбит/с',
                        status: "Connected", image: '', "type": "Inline"
                    }]);

                expect(result[5].rows).toEqual([
                    {
                        id: 'inet1',
                        status: "Default", image: "",
                        "key": 6,
                        "value": `100 ${options.mbitsPerSecond}`,
                        "type": "Link"
                    },
                    {
                        id: 'tv1', "key": 14, "value": state.options.connectTvText,
                        status: "Allow", image: '', "type": "Link"
                    }]);
            });
        });
    });
});
