import React from 'react';
import classNames from 'classnames/bind';

import { Switch, Button, RangeSlider, Loader } from 'components/vendor-ui';

import { OperationStatus } from 'consts';

import layoutStyle from '../../styles.css';
import style from '../../../popup/styles.css';

const cx = classNames.bind(layoutStyle);

export default class UpspeedPopup extends React.Component {
  constructor(props) {
    super(props);

    this.toggleUpspeed = this.toggleUpspeed.bind(this);
    this.saveClick = this.saveClick.bind(this);
    this.sliderValueChange = this.sliderValueChange.bind(this);

    this.state = {
      toggleUpspeed: true,
      sliderValue: {
        fee: props.vsu.fee,
        value: props.speed,
        id: props.vsu.id
      },
      rangeSliderWhith: 1,
    };
  }

  componentDidMount() {
    this.setDimensions();

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.setDimensions);
    }
  }

  setDimensions = () => {
    this.setState({
      rangeSliderWhith: this.rangeSliderСontainer.getBoundingClientRect().width,
    });
  };

  toggleUpspeed() {
    this.setState({ toggleUpspeed: !this.state.toggleUpspeed });
  }

  saveClick() {
    const { id } = this.state.sliderValue;
    if (this.props.saveClick && this.props.vsu.id !== id) {
      const vsu = this.props.vsuServices.find(x => x.id === id);
      this.props.saveClick(vsu);
    }
  }

  sliderValueChange(value) {
    const toggleUpspeed = this.state.toggleUpspeed;
    if (this.state.sliderValue.fee !== value.fee || this.state.sliderValue.value !== value.value) {
      this.setState({ toggleUpspeed, sliderValue: value });
    }
  }

  render() {
    const {
      title,
      benefit,
      currentSpeedText,
      speedText,
      currencyAndDelayText,
      toText,
      saveText,
      speedIn,
      speed,
      vsuServiceText,
      vsuServices,
      vsu,
      rubSymbol,
      speedUpAwaiter,
      successText,
      failText
    } = this.props;

    const points = vsuServices.length;
    const val = vsuServices.map((x, i) => (
      {
        value: { fee: x.fee, value: x.value + speedIn, id: x.id },
        text: i === (vsuServices.length - 1) ? `${x.fee}${rubSymbol}` : x.fee,
        position: ((i + 1) / points) * 100
      })
    );
    val.unshift({
      value: { fee: 0, value: speedIn, id: null },
      text: `0${rubSymbol}`,
      position: 0
    });
    const topVal = vsuServices.map((x, i) => {
      const percentPosition = `${((i + 1) / points)}`;
      const sliderWidth = this.state.rangeSliderWhith;
      const left = `${sliderWidth * percentPosition}px`;
      return (
        <div
          className={cx(style['lk-page-popup__range-slider-top-value'])}
          key={`${(i + 1).toString()}`}
          style={{
            left,
            transform: 'translate(-50%)'
          }}
        >
          { i === (vsuServices.length - 1) ? `${x.value + speedIn} ${speedText}` : `${x.value + speedIn}`}
        </div>);
    });
    topVal.unshift(
      <div
        className={cx(style['lk-page-popup__range-slider-top-value'])}
        key={0}
        style={{ left: '-13px' }}
      >
        {`${speedIn} ${speedText}`}
      </div>
    );

    const initialPosition = (val.filter(x => x.value.id === vsu.id)[0] || {}).position || 0;

    let slider = null;
    if (this.state.toggleUpspeed === true) {
      slider = (
        <div>
          <p className={cx(style['lk-page-popup__range-slider-note'])}>
            {vsuServiceText}
          </p>
          <div
            className={cx(style['lk-page-popup__range-slider-top-values'])}
            ref={(c) => { this.rangeSliderСontainer = c; }}
          >
            {topVal}
          </div>
          <RangeSlider sticky values={val} onValueChange={this.sliderValueChange} initialPosition={initialPosition} />
        </div>
      );
    }

    const content = (() => {
      switch (speedUpAwaiter.status) {
        case OperationStatus.Pending:
          return (
            <div className={cx(style['lk-internet__popup-title-note'],
              style['lk-internet__popup-title-note--centered'])}
            >
              <Loader size="small" active lastIcon="clock" timeout={250}>{[]}</Loader>
            </div>
          );
        case OperationStatus.Success:
          return (
            <div>
              <h3 className={cx(style['lk-internet__popup-title-note'],
                style['lk-internet__popup-title-note--centered'])}
              >{successText}</h3>
            </div>
          );
        case OperationStatus.Fail:
          return (
            <div>
              <h3 className={cx(style['lk-internet__popup-title-note'],
                style['lk-internet__popup-title-note--centered'])}
              >{failText}</h3>
            </div>
          );
        default:
          return (
            <React.Fragment>
              <p className={cx(style['lk-internet__popup-title-note'])}>{benefit}</p>
              <h3 className={cx(style['lk-internet__popup-subtitle'])}>
                {currentSpeedText} {speed} {speedText}
              </h3>
              <div className={cx('lk-internet__row',
                            style['lk-internet__row--popup-layout'],
                            style['lk-internet__row--popup-layout-first'],
                            style['lk-internet__row--popup-layout-nobottomborder']
                        )}
              >
                <div className={cx('lk-internet__cell', style['lk-internet__cell--popup-left-common'])}>
                  <Switch onChange={this.toggleUpspeed} defaultChecked />
                </div>
                <div className={cx('lk-internet__cell', style['lk-internet__cell--popup-middle-wide'])}>
                  <div className={cx('lk-internet__option-name', style['lk-internet__option-name--large'])}>
                    {title}
                  </div>
                  <div className={cx(style['lk-internet__popup-option-description'])}>
                    <span>{toText} {speed} {speedText}</span>
                  </div>
                </div>
                <div className={cx('lk-internet__cell')}>
                  <span className={cx('lk-internet__tile-cost', style['lk-internet__tile-cost--large'])}>
                    {vsu.fee ? vsu.fee : 0} {currencyAndDelayText}
                  </span>
                </div>
              </div>
              {this.state.toggleUpspeed &&
              <div className={cx('lk-internet__row', style['lk-internet__row--popup-layout'])}>
                <div className={cx('lk-internet__cell', style['lk-internet__cell--popup-single-padded'])}>
                  {slider}
                </div>
              </div>}
              <div className={cx(style['lk-internet__popup-btn-container'],
                          style['lk-internet__popup-btn-container--padded'],
                          style['lk-internet__popup-btn-container--wide-btn'])}
              >
                <Button className={'big'} onClick={this.saveClick}>{saveText}</Button>
              </div>
            </React.Fragment>
          );
      }
    })();

    return (
      <div className={cx(style['lk-internet__popup'])}>
        <h2 className={cx(style['lk-internet__popup-title'], style['lk-internet__popup-title--centered'])}>{title}</h2>
        {content}
      </div>
    );
  }
}
