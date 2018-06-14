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

const Inet = (props) => {
  const {
    title,
    isShow,
    items,
    buttonTitle,
    change,
    save,
    cancelTitle,
    cancel,
    speedChangeText,
    speedSelectText,
    toggleSpeedChooser,
    dispaySpeedChooser,
    changeSpeed,
    oncePriceChangeSpeedText
  } = props;

  if (!isShow) {
    return null;
  }

  const list = (items || []).map(x => (<div key={x.id}>
    <Switch
      id={x.id}
      checked={x.connected}
      disabled={x.disabled}
      onChange={() => change(x.id)}
    />
    {Parser(x.name)}
    <div>
      {Parser(x.speed)}
      {Parser(x.speedTitle)}
      {Parser(x.fee)}
    </div>
    <div>
      {Parser(x.nightSpeed)}
      {Parser(x.nightSpeedTitle)}
    </div>
    {x.vsu && x.vsu.length > 0 && <div>
      <DynamicLink
        opener
        showArrow
        text={speedChangeText}
        onClick={() => toggleSpeedChooser(x.id)}
        openerActive={dispaySpeedChooser.includes(x.id)}
      />
    </div>}
    {x.vsu && x.vsu.length > 0 && <div
      style={{ display: dispaySpeedChooser.includes(x.id) ? 'block' : 'none' }}
    >
      <div>{Parser(speedSelectText)}</div>
      {x.vsu.map(v => (<div
        onClick={() => changeSpeed(x.id, v.id)}
        role="button"
        tabIndex={0}
        style={{ backgroundColor: x.connected && v.connected ? 'green' : '' }}
      >{v.name} {v.fee}</div>))}
      {oncePriceChangeSpeedText && <div>{Parser(oncePriceChangeSpeedText)}</div>}
    </div>}
    {Parser(x.description)}
  </div>));

  return (<div className={cx('catalog__popup-content')}>
    <h2 className={cx(commonStyles['vendor-shpd-home-catalog__title'])}>{Parser(title)}</h2>
    {list}
    <div>
      <Button click={save}>{Parser(buttonTitle)}</Button>
    </div>
    <div>
      <DynamicLink onClick={cancel} opener={false} showArrow={false} text={cancelTitle} />
    </div>
  </div>);
};

Inet.propTypes = {
  title: PropTypes.string,
  isShow: PropTypes.bool,
  buttonTitle: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    connected: PropTypes.bool,
    name: PropTypes.string,
    fee: PropTypes.string,
    description: PropTypes.string,
    speed: PropTypes.string,
    speedTitle: PropTypes.string,
    nightSpeed: PropTypes.string,
    nightSpeedTitle: PropTypes.string,
    vsu: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      connected: PropTypes.bool,
      name: PropTypes.string,
      fee: PropTypes.string
    }))
  })),
  change: PropTypes.func,
  save: PropTypes.func,
  cancelTitle: PropTypes.string,
  cancel: PropTypes.func,
  speedChangeText: PropTypes.string,
  speedSelectText: PropTypes.string,
  toggleSpeedChooser: PropTypes.func,
  dispaySpeedChooser: PropTypes.arrayOf(PropTypes.string),
  changeSpeed: PropTypes.func,
  oncePriceChangeSpeedText: PropTypes.string
};

Inet.defaultProps = {
  title: '',
  isShow: false,
  buttonTitle: 'Сохранить изменения',
  items: [],
  change: () => { },
  save: () => { },
  cancelTitle: 'Отменить изменения',
  cancel: () => { },
  speedChangeText: 'Изменить скорость',
  speedSelectText: 'Выберите скорость',
  toggleSpeedChooser: () => {},
  dispaySpeedChooser: [],
  changeSpeed: () => {},
  oncePriceChangeSpeedText: ''
};

export default Inet;
