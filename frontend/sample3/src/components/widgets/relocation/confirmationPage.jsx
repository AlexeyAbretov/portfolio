import classNames from 'classnames/bind';
import popupStyle from 'components/popup/styles.css';
import { Button, TextInput } from 'components/vendor-ui';

const cx = classNames.bind(popupStyle);

export default (props) => {
  const {
    title,
    titleIconUrl,
    description,
    submitButtonText,
    onSubmit,
    onBackClick,
    phone,
    onPhoneChange,
    disableSubmit
  } = props;
  return (
    <div className={cx('lk-internet__popup')}>
      <div className={cx('lk-page-popup__btn-back')}>
        <img
          src="http://static.vendordev.ru/upload/images/home/profile/long-arrow.png"
          alt="icon"
          className={cx('lk-page-popup__btn-back-icon')}
        />
        <a href="!#" onClick={onBackClick} className="dynamic">Назад к вводу адреса</a>
      </div>
      <h2 className={cx('lk-internet__popup-title', 'lk-internet__popup-title--centered')}>
        {title}
        <img src={titleIconUrl} alt="icon" className={cx('lk-page-popup__title-icon')} />
      </h2>
      <p className={cx(
        'lk-internet__popup-title-note',
        'lk-internet__popup-title-note--centered')}
      >
        {description}
      </p>
      <form action="" className={cx('lk-page-popup__submit-request-form')}>
        <div className={cx('lk-page-popup__form-row')}>
          <div className={cx('lk-page-popup__form-cell')}>
            <TextInput
              value={phone}
              onChange={onPhoneChange}
              mask="+7 ___ ___ __ __"
              className={cx('submit-popup__input')}
              size="big"
            />
          </div>
          <div className={cx('lk-page-popup__form-cell')}>
            <Button className={'big'} onClick={onSubmit} disabled={disableSubmit} wide>
              {submitButtonText}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
