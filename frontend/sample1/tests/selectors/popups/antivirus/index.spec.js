/* eslint-disable */

import {
    getSortedGroups
} from 'selectors/popups/antivir';

import {
    ServiceTypes,
    PopupNames
} from 'consts';

describe('tv antivir popup (selector) tests', () => {
    it('getSortedGroups - groupsOrder is not empty', () => {
        let groupsOrder = [
            ServiceTypes.Kasper,
            ServiceTypes.Eset,
            ServiceTypes.DrWeb
        ];

        const groups = [{
            title: 'Kasper',
            code: ServiceTypes.Kasper
        },
        {
            title: 'Eset',
            code: ServiceTypes.Eset
        },
        {
            title: 'Dr.Web',
            code: ServiceTypes.DrWeb
        }];

        let state = {
            options: {
                antivirusGroups: groups,
                antivirusGroupsOrder: groupsOrder
            }
        }

        let result = getSortedGroups(state);
        expect(result.length).toEqual(3);
        expect(result[0].code).toEqual(groups[0].code);
        expect(result[1].code).toEqual(groups[1].code);
        expect(result[2].code).toEqual(groups[2].code);

        groupsOrder = [
            ServiceTypes.Eset,
            ServiceTypes.Kasper,
            ServiceTypes.DrWeb
        ]

        state = {
            options: {
                antivirusGroups: groups,
                antivirusGroupsOrder: groupsOrder
            }
        }

        result = getSortedGroups(state);
        expect(result.length).toEqual(3);
        expect(result[0].code).toEqual(groups[1].code);
        expect(result[1].code).toEqual(groups[0].code);
        expect(result[2].code).toEqual(groups[2].code);
    });

    it('getSortedGroups - groupsOrder is empty', () => {
        let groupsOrder = null;

        const groups = [{
            title: 'Kasper',
            code: ServiceTypes.Kasper
        },
        {
            title: 'Eset',
            code: ServiceTypes.Eset
        },
        {
            title: 'Dr.Web',
            code: ServiceTypes.DrWeb
        }];

        const state = {
            options: {
                antivirusGroups: groups,
                antivirusGroupsOrder: groupsOrder
            },
            presets: [{
                id: 'preset1',
                services: [{
                    id: 'eset1',
                    type: ServiceTypes.Eset
                }, {
                    id: 'kav1',
                    type: ServiceTypes.Kasper
                },

                {
                    id: 'drweb1',
                    type: ServiceTypes.DrWeb
                }]
            }],
            popups: {
                opened: [{
                    name: PopupNames.Antivir,
                    data: {
                        presetId: 'preset1',
                        serviceId: 'kav1'
                    }
                }]
            }
        }

        const result = getSortedGroups(state);
        expect(result.length).toEqual(3);
        expect(result[0].code).toEqual(ServiceTypes.Eset);
        expect(result[1].code).toEqual(ServiceTypes.Kasper);
        expect(result[2].code).toEqual(ServiceTypes.DrWeb);
    });
});
