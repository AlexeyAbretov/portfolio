
/* eslint-disable */

import { testSaga, expectSaga } from 'redux-saga-test-plan';

import { toggleService } from 'sagas/services/toggle';

import {
    getPresets,
    getChanges
} from 'selectors';

import actions from 'symbiotes/changes';

const action = {
    type: actions.services.toggle.start.toString(),
    payload: [
        'preset 1',
        'service 1'
    ]
};

const emptyState = {
    preset: [],
    changes: {
        'preset 1': {
            added: []
        }
    }
};

const stateNoAdded = {
    presets: [{
        id: 'preset 1',
        services: [{
            id: 'service 1',
            isAllow: true
        }]
    }],
    changes: {
        'preset 1': {
            added: []
        }
    }
}

const stateWithAdded = {
    presets: [{
        id: 'preset 1',
        services: [{
            id: 'service 1',
            isAllow: true
        }]
    }],
    changes: {
        'preset 1': {
            added: [{
                id: 'service 1',
                isAllow: true
            }]
        }
    }
}

describe('toggle service saga tests', () => {
    it('unit test - correct order - no state', () => {
        testSaga(toggleService, action)
            .next()
            .select(getPresets)
            .next()
            .isDone();
    });

    it('unit test - correct order - empty state', () => {
        expectSaga(toggleService, action)
            .withState(emptyState)
            .select(getPresets)
            .run();

        expectSaga(toggleService, action)
            .withState(emptyState)
            .not.select(getChanges)
            .run();

        expectSaga(toggleService, action)
            .withState(emptyState)
            .not.put({ type: actions.services.add.start.toString() })
            .run();

        expectSaga(toggleService, action)
            .withState(emptyState)
            .not.put({ type: actions.services.add.undo.start.toString() })
            .run();
    });

    it('unit test - correct order - state - no added', () => {
        expectSaga(toggleService, action)
            .withState(stateNoAdded)
            .put({
                type: actions.services.add.start.toString(),
                payload: ['preset 1', { id: 'service 1', isAllow: true }]
            })
            .run();
        expectSaga(toggleService, action)
            .withState(stateNoAdded)
            .not.put({ type: actions.services.add.undo.start.toString() })
            .run();
    });

    it('unit test - correct order - state - with added', () => {
        expectSaga(toggleService, action)
            .withState(stateWithAdded)
            .not.put({
                type: actions.services.add.start.toString()
            })
            .run();
        expectSaga(toggleService, action)
            .withState(stateWithAdded)
            .put({
                type: actions.services.add.undo.start.toString(),
                payload: ['preset 1', { id: 'service 1', isAllow: true }]
            })
            .run();
    });
});
