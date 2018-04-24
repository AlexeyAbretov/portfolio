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

    const changes = state[key];
    if (changes) {
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

    const changes = state[key];
    if (changes) {
      return {
        ...state,
        [key]: {
          ...changes,
          added: [
            ...changes.added,
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

    const changes = state[key];
    if (changes) {
      const index = changes.added
        .findIndex(x => x.id === service.id);
      if (index === -1) {
        return state;
      }

      return {
        ...state,
        [key]: {
          ...changes,
          added: [
            ...changes.added.slice(0, index),
            ...changes.added.slice(index + 1)
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

    const changes = state[key];
    if (changes) {
      return {
        ...state,
        [key]: {
          ...changes,
          removed: [
            ...changes.removed,
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

    const changes = state[key];
    if (changes) {
      const index = changes.removed
        .findIndex(x => x.id === service.id);
      if (index === -1) {
        return state;
      }

      return {
        ...state,
        [key]: {
          ...changes,
          removed: [
            ...changes.removed.slice(0, index),
            ...changes.removed.slice(index + 1)
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

