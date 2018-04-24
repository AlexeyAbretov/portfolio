
/* eslint-disable */

import { testSaga, expectSaga } from 'redux-saga-test-plan';

import addSaga, { addService } from 'sagas/services/add';
import actions from 'symbiotes/changes';
import reducer from 'reducers/changes';

import initialState from './states/initial';

const action = {
    type: actions.services.add.start.toString(),
    payload: [
        1,
        {
            id: 'service 1',
            isAllow: true
        }]
};

describe('add service saga tests', () => {
    it('unit test - correct order - no error', () => {
        testSaga(addService, action)
            .next()
            .put({
                type: actions.services.add.pending.toString(),
                payload: []
            })
            .next()
            .put({
                type: actions.services.add.success.toString(),
                payload: [1, { id: 'service 1', isAllow: true }]
            })
            .next()
            .isDone();
    });

    it('unit test - with reducer - should return the initial state', () => {
        return expectSaga(addSaga)
            .withReducer(reducer)
            .hasFinalState(initialState)
            .dispatch({ type: actions.services.add.start })
            .run();
    });
});
