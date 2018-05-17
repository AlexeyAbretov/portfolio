/* eslint-disable */

import {
    itemsSelector
} from 'selectors/grid';

import {
    ServiceTypes,
    Groups
} from 'consts';

import fullData from './data/full';
import noTvInetData from './data/no_tv_inet';
import allGroupsHaveItemsData from './data/all_groups_have_items';

describe('Grid items selector tests', () => {
    describe('no data', function () {
        it('null/undefined state', () => {
            const result = itemsSelector(null);

            expect(result).not.toBeNull();
            expect(result[Groups.InetTv]).toBeUndefined();
            expect(result[Groups.Inet]).toBeUndefined();
            expect(result[Groups.Tv]).toBeUndefined();
        });

        it('null/undefined presets/options', () => {
            const state = {
                options: null,
                presets: null
            };

            const result = itemsSelector(state);

            expect(result).not.toBeNull();
            expect(result[Groups.InetTv]).toBeUndefined();
            expect(result[Groups.Inet]).toBeUndefined();
            expect(result[Groups.Tv]).toBeUndefined();
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
            const result = itemsSelector(state);

            expect(result).not.toBeNull();
            expect(result[Groups.InetTv]).toBeUndefined();
            expect(result[Groups.Inet]).toBeUndefined();
            expect(result[Groups.Tv]).toBeUndefined();
        });
    });

    describe('correct data', function () {
        it('full - exists all groups', () => {
            const result = itemsSelector(fullData);

            expect(result).not.toBeNull();
            expect(result[Groups.InetTv]).not.toBeUndefined();
            expect(result[Groups.Inet]).not.toBeUndefined();
            expect(result[Groups.Tv]).not.toBeUndefined();
        });

        it('full tv & inet presets', () => {
            const result = itemsSelector(noTvInetData);

            expect(result).not.toBeNull();
            expect(result[Groups.InetTv]).toBeUndefined();
            expect(result[Groups.Inet]).not.toBeUndefined();
            expect(result[Groups.Tv]).not.toBeUndefined();

            expect(result[Groups.Inet].length).toBe(1);
            expect(result[Groups.Tv].length).toBe(1);
        });

        it('full tv & inet preset - all groups have items', () => {
            const result = itemsSelector(allGroupsHaveItemsData);

            expect(result).not.toBeNull();
            expect(result[Groups.InetTv]).not.toBeUndefined();
            expect(result[Groups.Inet]).not.toBeUndefined();
            expect(result[Groups.Tv]).not.toBeUndefined();

            expect(result[Groups.InetTv].length).toBe(1);
            expect(result[Groups.Inet].length).toBe(1);
            expect(result[Groups.Tv].length).toBe(1);
        });
    });
});
