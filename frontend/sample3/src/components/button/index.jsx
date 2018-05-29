import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './styles.css';

export const ButtonIcon = {
  Reload: 'reload',
  Remove: 'remove'
};

export const ButtonType = {
  Common: 'common',
  Gray: 'sub',
  GrayLabel: 'sub label'
};

const cx = classNames.bind(styles);

export default class Button extends React.Component {
  static defaultProps = {
    isVisible: true,
    text: '',
    type: ButtonType.Common,
    icon: null,
    isDisabled: false,
    hasIndent: false
  }

  handleClick = (e) => {
    if (this.props.isDisabled) {
      return;
    }
    if (this.props.click) {
      this.props.click(e);
    }
  }

  render() {
    const { isVisible, text, type, icon, isDisabled, hasIndent } = this.props;

    if (!isVisible) {
      return null;
    }

    const iconCss = cx({
      'label-icon-reload': icon === ButtonIcon.Reload,
      'label-icon-remove': icon === ButtonIcon.Remove,
    });

    const btnCss = cx({
      [styles.button]: true,
      disabled: isDisabled,
      common: type === ButtonType.Common,
      sub: type === ButtonType.Gray,
      'sub label': type === ButtonType.GrayLabel,
      indent: hasIndent
    });

    const disabledCss = cx({
      disabled: true
    });

    return (
      <span
        className={btnCss}
        onClick={this.handleClick}
        role="button"
        tabIndex={0}
      >
        <input type="submit" value={text} />
        <label htmlFor="#">
          {text}
          {icon ? <span className={iconCss} /> : null}
        </label>
        <span className={disabledCss}>{text}</span>
      </span>
    );
  }
}

Button.propTypes = {
  isVisible: PropTypes.bool,
  text: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.string,
  isDisabled: PropTypes.bool
};
