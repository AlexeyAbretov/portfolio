import { ToggleButtons } from 'components/button/toggle';

import {
  INTERNET_GROUP_BY_MONTH_ID,
  INTERNET_GROUP_BY_SESSION_ID
} from 'consts';

const InternetSwitcher = (props) => {
  const options = {
    active: props.active,
    items: [{
      id: INTERNET_GROUP_BY_MONTH_ID,
      title: 'Месяц'
    },
    {
      id: INTERNET_GROUP_BY_SESSION_ID,
      title: 'Сессия'
    }],
    click: props.click
  };

  return (
    <ToggleButtons {...options} />
  );
};

export default InternetSwitcher;
