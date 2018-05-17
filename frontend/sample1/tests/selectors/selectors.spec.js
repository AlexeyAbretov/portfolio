/* eslint-disable */

import {
    getPresetItemsOrder,
    getPresetServices
} from 'selectors';

import {
    ServiceTypes
} from 'consts';

describe('Common selectors tests', () => {
    const initialState = {
        presets: [{
            name: 'p1',
            services: [{
                type: ServiceTypes.Internet
            }]
        },
        {
            name: 'p2',
            services: [{
                type: ServiceTypes.TvTariff
            }]
        },
        {
            name: 'p3',
            services: null
        }]
    };

    const defaultOrder = [
        { "key": ServiceTypes.Internet },
        { "key": ServiceTypes.Vsu },
        { "key": ServiceTypes.TvTariff },
        { "key": ServiceTypes.WifiRent },
        { "key": ServiceTypes.TvConsole },
        { "key": ServiceTypes.Eset },
        { "key": ServiceTypes.StaticIp },
        { "key": ServiceTypes.Firewall }];

    beforeEach(() => {
    });

    describe('getPresetServices tests', function () {
        it('correct', () => {
            const expectArray = [{ "type": 6 }, { "type": 14 }];
            const result = getPresetServices(initialState);

            expect(result).not.toBeNull();
            expect(result.length).toBe(2);
            expect(result).toEqual(expectArray);
        });
    });

    describe('getPresetItemsOrder - presetItemsOrder - not set', function () {
        it('getPresetItemsOrder - presetItemsOrder - null/undefined state', () => {
            const state = null;
            const result = getPresetItemsOrder(state);

            expect(result).not.toBeNull();
            expect(result.length).toBe(8);
            expect(result).toEqual(defaultOrder);
        });

        it('getPresetItemsOrder - presetItemsOrder - null/undefined presetItemsOrder', () => {
            const state = {
                options: {

                }
            };
            const result = getPresetItemsOrder(state);

            expect(result).not.toBeNull();
            expect(result.length).toBe(8);
            expect(result).toEqual(defaultOrder);
        });

        it('getPresetItemsOrder - presetItemsOrder - empty presetItemsOrder', () => {
            const state = {
                options: {
                    presetItemsOrder: []
                }
            };
            const result = getPresetItemsOrder(state);

            expect(result).not.toBeNull();
            expect(result.length).toBe(8);
            expect(result).toEqual(defaultOrder);
        });
    });

    describe('getPresetItemsOrder presetItemsOrder has data', function () {
        it('getPresetItemsOrder - default data', () => {
            const state = {
                ...initialState
            };
            const result = getPresetItemsOrder(state);

            expect(result).not.toBeNull();
            expect(result.length).toBe(8);
            expect(result).toEqual(defaultOrder);
        });

        const customOrder = [{ "key": 6 },
        { "key": 16 },
        { "key": 14 }];

        it('getPresetItemsOrder - custom data', () => {
            const state = {
                options: {
                    presetItemsOrder: [
                        ServiceTypes.Internet,
                        ServiceTypes.WifiRent,
                        ServiceTypes.TvTariff,
                    ]
                }
            };

            const result = getPresetItemsOrder(state);

            expect(result).not.toBeNull();
            expect(result.length).toBe(3);
            expect(result).toEqual(customOrder);
        });

        it('getPresetItemsOrder - custom data - with additonal services', () => {
            const state = {
                options: {
                    presetItemsOrder: [
                        ServiceTypes.Internet,
                        ServiceTypes.WifiRent,
                        ServiceTypes.TvTariff,
                    ]
                },
                presets: [{
                    services: [{
                        type: ServiceTypes.Internet,
                    }, {
                        type: ServiceTypes.WifiRent,
                    }]
                }, {
                    services: [{
                        type: ServiceTypes.Firewall,
                    }]
                }]
            };

            const result = getPresetItemsOrder(state);

            expect(result).not.toBeNull();
            expect(result.length).toBe(4);

            expect(result).toEqual(
                [{ "key": 6 },
                { "key": 16 },
                { "key": 14 },
                { "key": 10 }]);
        });
    });
});
