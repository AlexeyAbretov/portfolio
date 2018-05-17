import mappingsDecorator from './mappings';
import changesDecorator from './changes';
import connectedPresetDecorator from './connected';

const decoratorsOrder = [
  changesDecorator,
  connectedPresetDecorator,
  mappingsDecorator
];

export default ({ state, row, preset, service } = {}) => {
  let result = row;
  for (let i = 0; i < decoratorsOrder.length; i += 1) {
    if (!result) {
      break;
    }

    result = decoratorsOrder[i]({
      state,
      row: result,
      preset,
      service
    });
  }

  return result;
};
