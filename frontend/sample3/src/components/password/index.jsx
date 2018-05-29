/* eslint jsx-a11y/no-static-element-interactions:0 */
import React from 'react';

export default class Password extends React.Component {
  constructor(props) {
    super(props);

    this.OnPasswordChange = this.OnPasswordChange.bind(this);
    this.OnToggleShowPassword = this.OnToggleShowPassword.bind(this);

    this.state = {
      showPassword: false,
      password: props.password
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ password: nextProps.password });
  }

  OnPasswordChange(e) {
    if (e && e.target && e.target.value) {
      this.setState({ password: e.target.value });
      this.props.onChange(e.target.value);
    } else {
      this.setState({ password: '' });
      this.props.onChange('');
    }
  }

  OnToggleShowPassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  render() {
    return (
      <div className={`input ${this.props.isError ? 'errorField' : ''}`}>
        <input
          type={this.state.showPassword ? 'text' : 'password'}
          value={this.state.password}
          onChange={this.OnPasswordChange}
        />
        <span className="pass-icon" style={{ top: '14px' }} onClick={this.OnToggleShowPassword} />
        <div className="form-tip" style={{ display: this.props.isError ? '' : 'none' }}>
          {this.props.errorText}
        </div>
      </div>
    );
  }
}
