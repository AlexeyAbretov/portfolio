import { handleActions } from 'redux-actions';

import actions, { initState } from 'symbiotes/changes';

export default handleActions({
  [actions.services.set.pending]: state => ({
    ...state
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
        }
      };
    }

    return state;
  },
  [actions.services.set.error]: state => ({
    ...state
  }),
  [actions.services.add.pending]: state => ({
    ...state
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
      }
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
        }
      };
    }

    return state;
  },
  [actions.services.add.error]: state => ({
    ...state
  }),
  [actions.services.remove.pending]: state => ({
    ...state
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
        }
      };
    }

    return {
      ...state,
      [key]: {
        added: [],
        removed: [service]
      }
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
        }
      };
    }

    return state;
  },
  [actions.services.remove.error]: state => ({
    ...state
  })
}, initState);

