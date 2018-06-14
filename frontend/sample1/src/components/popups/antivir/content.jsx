import React from 'react';
import PropTypes from 'prop-types';
import Parser from 'react-html-parser';
import classNames from 'classnames/bind';

import styles from 'components/popups/styles.css';
import commonStyles from 'components/styles.css';

import DynamicLink from 'components/dynamicLink';
import Button from 'components/button';
import { Switch, RadioButton, TextInput } from 'components/vendor-ui';

const cx = classNames.bind(styles);

const Antivirus = (props) => {
  const {
    title,
    isShow,
    items,
    buttonTitle,
    change,
    save,
    cancelTitle,
    cancel,
    detailsTitle,
    dispayNotes,
    toggleNote,
    groups,
    onGroupChange,
    selectionNote,
    isShowSelectionNote,
    isButtonDisabled,
    isEmailShow,
    onEmailChange,
    emailNote
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
    {Parser(x.licenses)}
    {Parser(x.fee)}
    {x.description && <div>
      <DynamicLink opener={false} showArrow={false} text={detailsTitle} onClick={() => toggleNote(x.id)} />
      <div style={{ display: dispayNotes.includes(x.id) ? 'block' : 'none' }}>{Parser(x.description)}</div>
    </div>}
  </div>));

  const gItems = (groups || []).map(x => (<div key={x.code}>
    <RadioButton
      checked={x.selected}
      id={x.code}
      value={x.code.toString()}
      handleChange={() => onGroupChange(x.code)}
    >
      {Parser(x.title)}
    </RadioButton>
  </div>));

  return (<div className={cx('catalog__popup-content')}>
    <h2 className={cx(commonStyles['vendor-shpd-home-catalog__title'])}>{Parser(title)}</h2>
    {gItems}
    {list}
    <div style={{ display: isShowSelectionNote ? 'block' : 'none' }}>
      {Parser(selectionNote)}
    </div>
    <div>
      {isEmailShow && <div>{Parser(emailNote)}</div> }
    </div>
    <div>
      {isEmailShow && <TextInput type="email" onChange={onEmailChange} /> }
      <Button click={save} disabled={isButtonDisabled}>{Parser(buttonTitle)}</Button>
    </div>
    <div>
      <DynamicLink onClick={cancel} opener={false} showArrow={false} text={cancelTitle} />
    </div>
  </div>);
};

Antivirus.propTypes = {
  title: PropTypes.string,
  isShow: PropTypes.bool,
  buttonTitle: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    connected: PropTypes.bool,
    name: PropTypes.string,
    fee: PropTypes.string,
    type: PropTypes.number,
    licenses: PropTypes.string,
    description: PropTypes.string
  })),
  change: PropTypes.func,
  save: PropTypes.func,
  cancelTitle: PropTypes.string,
  cancel: PropTypes.func,
  dispayNotes: PropTypes.arrayOf(
    PropTypes.string
  ),
  toggleNote: PropTypes.func,
  groups: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool
  })),
  onGroupChange: PropTypes.func,
  selectionNote: PropTypes.string,
  isShowSelectionNote: PropTypes.bool,
  isButtonDisabled: PropTypes.bool,
  isEmailShow: PropTypes.bool,
  onEmailChange: PropTypes.func,
  emailNote: PropTypes.string
};

Antivirus.defaultProps = {
  title: '',
  isShow: false,
  buttonTitle: 'Сохранить изменения',
  items: [],
  change: () => { },
  save: () => { },
  cancelTitle: 'Отменить изменения',
  cancel: () => { },
  dispayNotes: [],
  toggleNote: () => { },
  groups: [],
  onGroupChange: () => { },
  selectionNote: '{0}',
  isShowSelectionNote: false,
  isButtonDisabled: false,
  isEmailShow: false,
  onEmailChange: () => {},
  emailNote: ''
};

export default Antivirus;
