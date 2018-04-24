/* eslint-disable */

import reducer from 'reducers/changes';
import
  actions
from 'symbiotes/changes';

import initialState from './states/initial';

describe('changes reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`should handle ${actions.services.add.start}`, () => {
    const action = {
      type: actions.services.add.start.toString()
    };

    expect(reducer(initialState, action)).toEqual(initialState);
  });

  it(`should handle ${actions.services.add.pending}`, () => {
    const action = {
      type: actions.services.add.pending.toString()
    };

    const pendingState = {
      ...initialState,
      loading: true
    };

    expect(reducer(initialState, action)).toEqual(pendingState);
  });

  it(`should handle ${actions.services.add.error}`, () => {
    const action = {
      type: actions.services.add.error.toString()
    };

    expect(reducer(initialState, action)).toEqual(initialState);
  });

  it(`should handle ${actions.services.add.success} - null payload`, () => {
    const service = {
      id: 1,
      name: 'service 1'
    };

    const action = {
      type: actions.services.add.success.toString(),
    };

    const successState = {
      ...JSON.parse(JSON.stringify(initialState)),
    };

    expect(reducer(initialState, action)).toEqual(successState);
  });

  it(`should handle ${actions.services.add.success}`, () => {
    const service = {
      id: 1,
      name: 'service 1'
    };

    const action = {
      type: actions.services.add.success.toString(),
      payload: [
        1,
        service]
    };

    const successState = {
      ...JSON.parse(JSON.stringify(initialState)),
    };

    successState[1] = { added: [service], removed: [] };

    expect(reducer(initialState, action)).toEqual(successState);
  });
});
