import React from 'react';
import PropTypes from 'prop-types';
import Parser from 'react-html-parser';
import classNames from 'classnames/bind';

import styles from 'components/popups/styles.css';
import commonStyles from 'components/styles.css';

import DynamicLink from 'components/dynamicLink';
import Button from 'components/button';
import { Switch } from 'components/vendor-ui';

const cx = classNames.bind(styles);

const WifiRouter = (props) => {
  const {
    description,
    title,
    isShow,
    items,
    buttonTitle,
    change,
    save,
    cancelTitle,
    cancel
  } = props;

  if (!isShow) {
    return null;
  }

  const list = (items || []).map(x => (<div key={x.id}>
    <Switch
      id={x.id}
      checked={x.connected}
      isFuture={x.future}
      disabled={x.disabled}
      onChange={() => change(x.id)}
    />
    {Parser(x.name)}
    {Parser(x.fee)}
    {Parser(x.feeNote)}
  </div>));

  return (<div className={cx('catalog__popup-content')}>
    <h2 className={cx(commonStyles['vendor-shpd-home-catalog__title'])}>{Parser(title)}</h2>
    <div>{Parser(description)}</div>
    {list}
    <div>
      <Button click={save}>{Parser(buttonTitle)}</Button>
    </div>
    <div>
      <DynamicLink onClick={cancel} opener={false} showArrow={false} text={cancelTitle} />
    </div>
  </div>);
};

WifiRouter.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  isShow: PropTypes.bool,
  buttonTitle: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    connected: PropTypes.bool,
    name: PropTypes.string,
    fee: PropTypes.string,
    feeNote: PropTypes.string
  })),
  change: PropTypes.func,
  save: PropTypes.func,
  cancelTitle: PropTypes.string
};

WifiRouter.defaultProps = {
  description: '',
  title: '',
  isShow: false,
  buttonTitle: 'Сохранить изменения',
  items: [],
  change: () => { },
  save: () => { },
  cancelTitle: 'Отменить изменения'
};

export default WifiRouter;
