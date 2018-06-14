/* eslint-disable */

import {
    getTitleSelector,
    getShippingTextSelector,
    getTv,
    getConsoles
} from 'selectors/popups/tv/console';

import {
    ServiceTypes,
    PopupNames
} from 'consts';

describe('tv console popup (selector) tests', () => {
    it('getTitleSelector - tvConsoleTitle is not empty', () => {
        const console = {
            id: 'tvconsole1',
            type: ServiceTypes.TvConsole,
            name: 'tvconsole1'
        };

        const state = {
            options: {
                tvConsoleTitle: 'ТВ-приставка'
            },

            presets: [{
                id: 'preset1',
                services: [
                    console
                ]
            }]
        }

        const result = getTitleSelector(state);
        expect(result).toEqual(state.options.tvConsoleTitle);
    });

    it('getTitleSelector - tvConsoleTitle is empty', () => {
        const console = {
            id: 'tvconsole1',
            type: ServiceTypes.TvConsole,
            name: 'tvconsole1'
        };

        const preset = {
            id: 'preset1',
            services: [
                console
            ]
        };

        const state = {
            options: {
                tvConsoleTitle: ''
            },

            presets: [
                preset
            ],

            popups: {
                opened: [{
                    name: PopupNames.TvConsole,
                    data: {
                        presetId: preset.id,
                        serviceId: console.id
                    }
                }]
            }
        }

        const result = getTitleSelector(state);
        expect(result).toEqual(console.name);
    });

    it('getShippingTextSelector - courier service does not exists', () => {
        const state = {
            options: {
                courierServiceText: 'Наш курьер привезет приставку {fee}'
            },

            services: []
        }

        const result = getShippingTextSelector(state);
        expect(result).toEqual('');
    });

    it('getShippingTextSelector - courier service exists', () => {
        const service = {
            type: ServiceTypes.Courier,
            isConnected: false,
            fee: 100.0
        };

        const state = {
            options: {
                courierServiceText: 'Наш курьер привезет приставку {fee}',
                rubSymbol: 'P',
            },

            services: {
                items: [
                    service
                ]
            }
        }

        const result = getShippingTextSelector(state);
        expect(result).toEqual(
            state.options.courierServiceText
                .replace(
                    '{0}',
                    `${service.fee} ${state.options.rubSymbol}`));
    });

    it('getTv - tv to be null - not in added', () => {
        const service = {
            id: 'tv1',
            type: ServiceTypes.TvTariff,
            isConnected: false,
            isAllow: true
        };

        const state = {
            preset: {
                services: [
                    service
                ]
            }
        }

        const result = getTv(state);
        expect(result).toBeUndefined();
    });

    it('getTv - tv - in added', () => {
        const service = {
            id: 'tv1',
            type: ServiceTypes.TvTariff,
            isConnected: false,
            isAllow: true
        };

        const preset = {
            id: 'preset1',
            services: [
                service
            ]
        };

        const state = {
            presets: [
                preset
            ],
            changes: {
                preset1: {
                    added: [service]
                }
            },
            popups: {
                opened: [{
                    name: PopupNames.TvConsole,
                    data: {
                        presetId: preset.id,
                        serviceId: service.id
                    }
                }]
            }
        }

        const result = getTv(state);
        expect(result).not.toBeUndefined();
        expect(result).not.toBeNull();
        expect(result.id).toEqual(service.id);
    });

    it('getTv - tv isRequired', () => {
        const service = {
            id: 'tv1',
            type: ServiceTypes.TvTariff,
            isConnected: false,
            isRequired: true
        };

        const preset = {
            id: 'preset1',
            services: [
                service
            ]
        };

        const state = {
            presets: [
                preset
            ],
            popups: {
                opened: [{
                    name: PopupNames.TvConsole,
                    data: {
                        presetId: preset.id,
                        serviceId: service.id
                    }
                }]
            }
        }

        const result = getTv(state);
        expect(result).not.toBeUndefined();
        expect(result).not.toBeNull();
        expect(result.id).toEqual(service.id);
    });

    it('getTv - tv PreInclude - changes is empty', () => {
        const service = {
            id: 'tv1',
            type: ServiceTypes.TvTariff,
            isConnected: false,
            isPreInclude: true
        };

        const preset = {
            id: 'preset1',
            services: [
                service
            ]
        };

        const state = {
            presets: [
                preset
            ],
            changes: {},
            popups: {
                opened: [{
                    name: PopupNames.TvConsole,
                    data: {
                        presetId: preset.id,
                        serviceId: service.id
                    }
                }]
            }
        }

        const result = getTv(state);
        expect(result).not.toBeUndefined();
        expect(result).not.toBeNull();
        expect(result.id).toEqual(service.id);
    });

    it('getTv - tv PreInclude - changes have removed', () => {
        const service = {
            id: 'tv1',
            type: ServiceTypes.TvTariff,
            isConnected: false,
            isPreInclude: true
        };

        const preset = {
            id: 'preset1',
            services: [
                service
            ]
        };

        const state = {
            presets: [
                preset
            ],
            changes: {
                preset1: {
                    removed: [
                        service
                    ]
                }
            },
            popups: {
                opened: [{
                    name: PopupNames.TvConsole,
                    data: {
                        presetId: preset.id,
                        serviceId: service.id
                    }
                }]
            }
        }

        const result = getTv(state);
        expect(result).toBeUndefined();
    });

    it('getConsole - no tv', () => {
        const service1 = {
            id: 'console1',
            type: ServiceTypes.TvConsole,
            isConnected: false,
            isAllow: true
        };

        const service2 = {
            id: 'console2',
            type: ServiceTypes.TvConsole,
            isConnected: false,
            isAllow: true
        };

        const preset = {
            id: 'preset1',
            services: [
                service1,
                service2
            ]
        };

        const state = {
            presets: [
                preset
            ],
            popups: {
                opened: [{
                    name: PopupNames.TvConsole,
                    data: {
                        presetId: preset.id,
                        serviceId: service1.id
                    }
                }]
            }
        }

        const result = getConsoles(state);
        expect(result).not.toBeNull();
        expect(result.length).toEqual(2);
    });

    it('getConsole - has tv - isTve === false', () => {
        const service1 = {
            id: 'console1',
            type: ServiceTypes.TvConsole,
            isConnected: false,
            isAllow: true
        };

        const service2 = {
            id: 'console2',
            type: ServiceTypes.TvConsole,
            isConnected: false,
            isAllow: true
        };

        const tv = {
            id: 'tv1',
            type: ServiceTypes.TvTariff,
            isConnected: false,
            isRequired: true
        };

        const preset = {
            id: 'preset1',
            services: [
                service1,
                service2,
                tv
            ]
        };

        const state = {
            presets: [
                preset
            ],
            popups: {
                opened: [{
                    name: PopupNames.TvConsole,
                    data: {
                        presetId: preset.id,
                        serviceId: service1.id
                    }
                }]
            }
        }

        const result = getConsoles(state);
        expect(result).not.toBeNull();
        expect(result.length).toEqual(2);
    });

    it('getConsole - has tv - isTve === true', () => {
        const service1 = {
            id: 'console1',
            type: ServiceTypes.TvConsole,
            isConnected: false,
            isAllow: true
        };

        const service2 = {
            id: 'console2',
            type: ServiceTypes.TvConsole,
            isConnected: false,
            isAllow: true,
            isTve: true
        };

        const tv = {
            id: 'tv1',
            type: ServiceTypes.TvTariff,
            isConnected: false,
            isRequired: true
        };

        const preset = {
            id: 'preset1',
            services: [
                service1,
                service2,
                tv
            ]
        };

        const state = {
            presets: [
                preset
            ],
            popups: {
                opened: [{
                    name: PopupNames.TvConsole,
                    data: {
                        presetId: preset.id,
                        serviceId: service1.id
                    }
                }]
            }
        }

        const result = getConsoles(state);
        expect(result).not.toBeNull();
        expect(result.length).toEqual(1);
    });
});
