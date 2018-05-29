/* eslint jsx-a11y/no-static-element-interactions:0 */

import classNames from 'classnames/bind';
import popupStyle from 'components/popup/styles.css';
import Portal from 'components/portal';
import { Button, Loader, Popup, TextInput } from 'components/vendor-ui';
import { OperationStatus } from 'consts';
import DinamicLink from 'components/dinamicLink';

const cx = classNames.bind(popupStyle);

const ConfirmPopup = (props) => {
  const {
    confirmCodeStatus,
    success,
    fail,
    codeFail,
    confirm,
    sendCode,
    text,
    sendText,
    confirmText,
    descriptionText,
    closePopup,
    isShow,
    // onBackClick
  } = props;

  let code = '';

  const message = (() => {
    switch (confirmCodeStatus) {
      case OperationStatus.Pending:
        return (<div><Loader size="small" active lastIcon="clock" timeout={250}>{[]}</Loader></div>);
      case OperationStatus.Success:
        return (<div>{success}</div>);
      case OperationStatus.Fail:
        return (<div>{fail}</div>);
      case OperationStatus.CustomError:
        return (
          <form action="" className={cx('lk-page-popup__request-number-form')}>
            <div className={cx('lk-page-popup__form-row', 'lk-page-popup__form-row--va-top')}>
              <div className={cx('lk-page-popup__form-cell')}>
                <TextInput
                  onChange={(e) => { code = e; }}
                  className={cx('submit-popup__input')}
                  size="big"
                />
                <span className={cx('lk-popup__input-error')}>{codeFail}</span>
                <div className={cx('submit-popup__input-link')}>
                  <DinamicLink
                    onClick={sendCode}
                    text={sendText}
                    color="#787878"
                  />
                </div>
              </div>
              <div className={cx('lk-page-popup__form-cell')}>
                <Button wide className={'big'} onClick={() => confirm(code)}>
                  {confirmText}
                </Button>
              </div>
            </div>
          </form>);
      default:
        return (
          <form action="" className={cx('lk-page-popup__request-number-form')}>
            <div className={cx('lk-page-popup__form-row', 'lk-page-popup__form-row--va-top')}>
              <div className={cx('lk-page-popup__form-cell')}>
                <TextInput
                  onChange={(e) => { code = e; }}
                  className={cx('submit-popup__input')}
                  size="big"
                />
                <div className={cx('submit-popup__input-link')}>
                  <DinamicLink
                    onClick={sendCode}
                    text={sendText}
                    color="#787878"
                  />
                </div>
              </div>
              <div className={cx('lk-page-popup__form-cell')}>
                <Button wide className={'big'} onClick={() => confirm(code)}>
                  {confirmText}
                </Button>
              </div>
            </div>
          </form>);
    }
  })();

  return (
    <Portal>
      <Popup opened={isShow} onClose={closePopup}>
        <div className={cx('lk-internet__popup')}>
          {/* <div className={cx('lk-page-popup__btn-back')}>
                <img
                  src="http://static.vendordev.ru/upload/images/home/profile/long-arrow.png"
                  alt="icon"
                  className={cx('lk-page-popup__btn-back-icon')}
                />
                <a href="!#" onClick={onBackClick} className="dynamic">Назад к вводу адреса</a>
              </div> */}
          <h2 className={cx('lk-internet__popup-title', 'lk-internet__popup-title--centered')}>{text}</h2>
          <p className={cx(
            'lk-internet__popup-title-note',
            'lk-internet__popup-title-note--centered')}
          >
            {descriptionText}
          </p>
          {message}
        </div>
      </Popup>
    </Portal>
  );
};

export default ConfirmPopup;
