import { handleActions } from 'redux-actions';

import actions, { initState } from 'symbiotes/changes';

export default handleActions({
  [actions.services.set.pending]: state => ({
    ...state,
    loading: true
  }),
  [actions.services.set.success]: (state, action) => {
    const [key, data] = action.payload || {};

    if (!key || !data) {
      return state;
    }

    if (state[key]) {
      return {
        ...state,
        [key]: {
          ...data
        },
        loading: false
      };
    }

    return state;
  },
  [actions.services.set.error]: state => ({
    ...state,
    loading: false
  }),
  [actions.services.add.pending]: state => ({
    ...state,
    loading: true
  }),
  [actions.services.add.success]: (state, action) => {
    const [key, service] = action.payload || [];

    if (!key || !service) {
      return state;
    }

    if (state[key]) {
      return {
        ...state[key],
        [key]: {
          ...state[key],
          added: [
            ...state[key].added,
            service
          ]
        }
      };
    }

    return {
      ...state,
      [key]: {
        added: [service],
        removed: []
      },
      loading: false
    };
  },
  [actions.services.add.undo.success]: (state, action) => {
    const [key, service] = action.payload || [];

    if (!key || !service) {
      return state;
    }

    if (state[key]) {
      const index = state[key].added
        .findIndex(x => x.id === service.id);
      if (index === -1) {
        return state;
      }

      return {
        ...state,
        [key]: {
          ...state[key],
          added: [
            ...state[key].added.slice(0, index),
            ...state[key].added.slice(index + 1)
          ]
        },
        loading: false
      };
    }

    return state;
  },
  [actions.services.add.error]: state => ({
    ...state,
    loading: false
  }),
  [actions.services.remove.pending]: state => ({
    ...state,
    loading: true
  }),
  [actions.services.remove.success]: (state, action) => {
    const [key, service] = action.payload || [];

    if (!key || !service) {
      return state;
    }

    if (state[key]) {
      return {
        ...state,
        [key]: {
          ...state[key],
          removed: [
            ...state[key].removed,
            service
          ]
        },
        loading: false
      };
    }

    return {
      ...state,
      [key]: {
        added: [],
        removed: [service]
      },
      loading: false
    };
  },
  [actions.services.remove.undo.success]: (state, action) => {
    const [key, service] = action.payload || [];

    if (!key || !service) {
      return state;
    }

    if (state[key]) {
      const index = state[key].removed
        .findIndex(x => x.id === service.id);
      if (index === -1) {
        return state;
      }

      return {
        ...state,
        [key]: {
          ...state[key],
          removed: [
            ...state[key].removed.slice(0, index),
            ...state[key].removed.slice(index + 1)
          ]
        },
        loading: false
      };
    }

    return state;
  },
  [actions.services.remove.error]: state => ({
    ...state,
    loading: false
  })
}, initState);

