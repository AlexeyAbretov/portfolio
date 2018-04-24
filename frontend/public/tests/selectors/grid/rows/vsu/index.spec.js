/* eslint-disable */

import vsuMapper from 'selectors/grid/rows/vsu';

import {
    ServiceTypes,
    GridRowStatus,
    TvPacketTypes,
    TvPacketSaveStatus
} from 'consts';

describe('vsu map (selector) tests', () => {
    it('correct - fit to max speed', () => {
        const inet = {
            id: 'inet1',
            type: ServiceTypes.Internet,
            speed: 100,
            isRequired: true
        };

        const vsu = [{
            id: 'vsu1',
            type: ServiceTypes.Vsu,
            speedUp: 20,
            maxSpeed: 140,
            isAllow: true
        }];

        const preset = {
            id: '1',
            services: [...vsu, inet]
        };

        const state = {
            presets: [preset]
        };

        const result = vsuMapper.selector({ preset, rows: null })(state);
        expect(result).toEqual(vsu.find(x => x.id === 'vsu1'));
    });

    it('correct - fit to max speed', () => {
        const inet = {
            id: 'inet1',
            type: ServiceTypes.Internet,
            speed: 100,
            isRequired: true
        };

        const vsu = [{
            id: 'vsu0',
            type: ServiceTypes.Vsu,
            speedUp: 60,
            maxSpeed: 140,
            isAllow: true
        },{
            id: 'vsu1',
            type: ServiceTypes.Vsu,
            speedUp: 20,
            maxSpeed: 140,
            isAllow: true
        }];

        const preset = {
            id: '1',
            services: [...vsu, inet]
        };

        const state = {
            presets: [preset]
        };

        const result = vsuMapper.selector({ preset, rows: null })(state);
        expect(result).toEqual(vsu.find(x => x.id === 'vsu1'));
    });

    it('correct - does not fit to max speed', () => {
        const inet = {
            id: 'inet1',
            type: ServiceTypes.Internet,
            speed: 100,
            isRequired: true
        };

        const vsu = [{
            id: 'vsu1',
            type: ServiceTypes.Vsu,
            speedUp: 20,
            maxSpeed: 110,
            isAllow: true
        }];

        const preset = {
            id: '1',
            services: [...vsu, inet]
        };

        const state = {
            presets: [preset]
        };

        const result = vsuMapper.selector({ preset, rows: null })(state);
        expect(result).toEqual(null);
    });
});
