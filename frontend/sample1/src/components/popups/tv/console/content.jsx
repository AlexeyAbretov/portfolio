import React from 'react';
import PropTypes from 'prop-types';
import Parser from 'react-html-parser';
import classNames from 'classnames/bind';

import styles from 'components/popups/styles.css';
import commonStyles from 'components/styles.css';

import Button from 'components/button';
import DynamicLink from 'components/dynamicLink';
import { Switch } from 'components/vendor-ui';

const cx = classNames.bind(styles);

const TvConsole = (props) => {
  const {
    description,
    title,
    isShow,
    items,
    buttonTitle,
    noteTitle,
    note,
    shippingText,
    isNoteShow,
    toggleNote,
    change,
    save
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
  </div>));

  return (<div className={cx('catalog__popup-content')}>
    <h2 className={cx(commonStyles['vendor-shpd-home-catalog__title'])}>{Parser(title)}</h2>
    <div>{Parser(description)}</div>
    {list}
    <div>{Parser(shippingText)}</div>
    <div>
      <Button click={save}>{Parser(buttonTitle)}</Button>
    </div>
    {note && <div>
      <DynamicLink
        showArrow
        text={noteTitle}
        onClick={toggleNote}
        opener
        openerActive={isNoteShow}
      />
      <div style={{ display: isNoteShow ? 'block' : 'none' }}>{Parser(note)}</div>
    </div>}
  </div>);
};

TvConsole.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  isShow: PropTypes.bool,
  buttonTitle: PropTypes.string,
  noteTitle: PropTypes.string,
  note: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    connected: PropTypes.bool,
    name: PropTypes.string,
    fee: PropTypes.string
  })),
  shippingText: PropTypes.string,
  isNoteShow: PropTypes.bool,
  toggleNote: PropTypes.func,
  change: PropTypes.func,
  save: PropTypes.func,
};

TvConsole.defaultProps = {
  description: '',
  title: '',
  isShow: false,
  buttonTitle: 'Сохранить изменения',
  noteTitle: 'В каких случаях приставка не нужна',
  note: '',
  items: [],
  shippingText: '',
  isNoteShow: false,
  toggleNote: () => { },
  change: () => { },
  save: () => { }
};

export default TvConsole;
