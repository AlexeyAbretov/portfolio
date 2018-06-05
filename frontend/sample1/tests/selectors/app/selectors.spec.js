/* eslint-disable */

import { 
    getNote
 } from 'selectors/app';

import {
    hasConnectedPreset,
    noConnectedPreset
} from './data/presets';

import {
    options,
    notSetOptions,
    emptyOptions
} from './data/options';

import {
    notSetServices,
    emptyServices,
    notConnectedServices,
    kitConnectedServices,
    otherConnectedServices
} from './data/services';

import {
    ServiceTypes
} from 'consts';

describe('app selectors tests', () => {
    it('notSetOptions - hasConnectedPreset', () => {
        const result = getNote({
            ...notSetOptions,
            ...hasConnectedPreset
        });

        expect(result).toBeNull();
    });

    it('emptyOptions - hasConnectedPreset', () => {
        const result = getNote({
            ...emptyOptions,
            ...hasConnectedPreset
        });

        expect(result).toBeNull();
    });

    it('notSetOptions - noConnectedPreset', () => {
        const result = getNote({
            ...notSetOptions,
            ...noConnectedPreset
        });

        expect(result).toEqual('');
    });

    it('emptyOptions - noConnectedPreset', () => {
        const result = getNote({
            ...emptyOptions,
            ...noConnectedPreset
        });

        expect(result).toEqual('');
    });

    it('correct options has connected preset', () => {
        const result = getNote({
            ...options,
            ...hasConnectedPreset
        });

        expect(result).toBeNull();
    });

    it('correct options no connected preset', () => {
        const result = getNote({
            ...options,
            ...noConnectedPreset
        });

        expect(result).toEqual('');
    });

    it('correct options notSetServices', () => {
        const result = getNote({
            ...options,
            ...noConnectedPreset,
            ...notSetServices
        });

        expect(result).toEqual('');
    });

    it('correct options emptyServices', () => {
        const result = getNote({
            ...options,
            ...noConnectedPreset,
            ...emptyServices
        });

        expect(result).toEqual('');
    });

    it('not connected services', () => {
        const result = getNote({
            ...options,
            ...noConnectedPreset,
            ...notConnectedServices
        });

        expect(result).toEqual('');
    });

    it('has connected kit', () => {
        const result = getNote({
            ...options,
            ...noConnectedPreset,
            ...kitConnectedServices
        });

        const kit = kitConnectedServices
            .services.items
            .find(x => x.type === ServiceTypes.Kit)
        expect(result).toEqual(
            options.options.bundleNote
                .replace('{0}', kit.name)
                .replace('{1}', kit.url));
    });

    it('has other connected services', () => {
        const result = getNote({
            ...options,
            ...noConnectedPreset,
            ...otherConnectedServices
        });

        expect(result).toEqual(
            options.options.note);
    });
});