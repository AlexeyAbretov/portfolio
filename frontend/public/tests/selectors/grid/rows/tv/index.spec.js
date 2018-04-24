/* eslint-disable */

import tvMapper from 'selectors/grid/rows/tv';

import {
    ServiceTypes,
    GridRowStatus,
    TvPacketTypes,
    TvPacketSaveStatus
} from 'consts';

describe('tv map (selector) tests', () => {
    it('null parameters', () => {
        expect(() => {
            tvMapper.selector(null)(null);
        }).toThrow();
    });

    it('undefined parameters', () => {
        const result = tvMapper.selector(undefined)(null);
        expect(result).toBeNull();
    });

    it('no tv', () => {
        const preset = {
            id: '1',
            services: []
        };
        const result = tvMapper.selector({ preset, rows: null })(null);
        expect(result).toBeNull();
    });

    it('has not connected tv', () => {
        const tv = {
            id: 'tv1',
            type: ServiceTypes.TvTariff,
            channels: 110,
            isRequired: true,
            isPreInclude: false,
            isLineHolder: false,
            hasGift: true,
            packets: [{
                channels: 10,
                isObligatory: false,
                isPreSelected: false,
                type: TvPacketTypes.Concrete,
                saveStatus: TvPacketSaveStatus.Unknow
            },
            {
                channels: 30,
                isObligatory: true,
                isPreSelected: false,
                type: TvPacketTypes.Concrete,
                saveStatus: TvPacketSaveStatus.Unknow
            },
            {
                channels: 20,
                isObligatory: false,
                isPreSelected: false,
                type: TvPacketTypes.Concrete,
                saveStatus: TvPacketSaveStatus.ById
            },
            {
                channels: 40,
                isObligatory: false,
                isPreSelected: false,
                type: TvPacketTypes.Concrete,
                saveStatus: TvPacketSaveStatus.ById
            },
            {
                channels: 40,
                isObligatory: false,
                isPreSelected: true,
                type: TvPacketTypes.Concrete,
                saveStatus: TvPacketSaveStatus.Unknow
            },
            {
                id: 'packet1',
                channels: 50,
                isObligatory: false,
                isPreSelected: true,
                type: TvPacketTypes.Concrete,
                saveStatus: TvPacketSaveStatus.Unknow
            }]
        };

        const preset = {
            id: '1',
            services: [tv]
        };

        const state = {
            changes: {
                'tv1': {
                    added: [{
                        id: 'packet2',
                        channels: 25
                    }],
                    removed: [{
                        id: 'packet1'
                    }]
                }
            }
        };

        const result = tvMapper.selector({ preset, rows: null })(null);
        expect(result).toEqual(tv);

        const row = {
            status: GridRowStatus.Default
        };
        const options = {};
        const changes = state.changes;
        const mapped = tvMapper.map({
            row,
            service: result,
            options,
            changes
        });

        expect(mapped).toEqual({
            status: GridRowStatus.Default,
            value: '265'
        });
    });

    it('has connected tv', () => {
        const tv = {
            id: 'tv1',
            type: ServiceTypes.TvTariff,
            channels: 110,
            isRequired: true,
            isPreInclude: false,
            isLineHolder: false,
            hasGift: true,
            isConnected: true,
            packets: [{
                channels: 10,
                isObligatory: false,
                isPreSelected: false,
                type: TvPacketTypes.Concrete,
                saveStatus: TvPacketSaveStatus.Unknow
            },
            {
                channels: 30,
                isObligatory: true,
                isPreSelected: false,
                type: TvPacketTypes.Concrete,
                saveStatus: TvPacketSaveStatus.Unknow
            },
            {
                channels: 20,
                isObligatory: false,
                isPreSelected: false,
                type: TvPacketTypes.Concrete,
                saveStatus: TvPacketSaveStatus.ById
            },
            {
                channels: 40,
                isObligatory: false,
                isPreSelected: false,
                type: TvPacketTypes.Concrete,
                saveStatus: TvPacketSaveStatus.ById
            },
            {
                channels: 40,
                isObligatory: false,
                isPreSelected: true,
                type: TvPacketTypes.Concrete,
                saveStatus: TvPacketSaveStatus.Unknow,
                isConnected: true
            },
            {
                id: 'packet1',
                channels: 50,
                isObligatory: false,
                isPreSelected: true,
                type: TvPacketTypes.Concrete,
                saveStatus: TvPacketSaveStatus.Unknow,
                isConnected: true
            }]
        };

        const preset = {
            id: '1',
            services: [tv]
        };

        const state = {
            changes: {
                'tv1': {
                    added: [{
                        id: 'packet2',
                        channels: 25
                    }],
                    removed: [{
                        id: 'packet1'
                    }]
                }
            }
        };

        const result = tvMapper.selector({ preset, rows: null })(null);
        expect(result).toEqual(tv);

        const row = {
            status: GridRowStatus.Connected
        };
        const options = {};
        const changes = state.changes;
        const mapped = tvMapper.map({
            row,
            service: result,
            options,
            changes
        });

        expect(mapped).toEqual({
            status: GridRowStatus.Connected,
            value: '175'
        });
    });
});
