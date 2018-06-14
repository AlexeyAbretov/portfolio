import {
  MappingState
} from 'consts';

export default {
  available: [{
    id: 'preset5',
    states: [{
      id: 'drweb1',
      state: MappingState.Change
    }]
  }, {
    id: 'preset4',
    states: [
      {
        id: 'inet3',
        state: MappingState.Change
      }]
  }, {
    id: 'preset3',
    states: [{
      id: 'wifi1',
      state: MappingState.Change
    },
    {
      id: 'support1',
      state: MappingState.Select
    }]
  }, {
    id: 'preset10',
    states: [{
      id: 'firewall1',
      state: MappingState.Change
    },
    {
      id: 'staticip1',
      state: MappingState.Select,
    },
    {
      id: 'wifi1', state: MappingState.Select,
    },
    {
      id: 'wifirent1', state: MappingState.Delete,
    },
    {
      id: 'button1', state: MappingState.Delete,
    },
    {
      id: 'button3', state: MappingState.Delete,
    },
    {
      id: 'button2', state: MappingState.Delete
    }]
  }]
};
