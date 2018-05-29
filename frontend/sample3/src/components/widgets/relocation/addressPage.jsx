import classNames from 'classnames/bind';
import popupStyle from 'components/popup/styles.css';
import { Button, TextInput, AutocompleteInput } from 'components/vendor-ui';

const cx = classNames.bind(popupStyle);

export default (props) => {
  const {
    title,
    description,
    street,
    region,
    streets,
    fetchStreets,
    resetStreetInfo,
    onStreetChange,
    house,
    fetchHouses,
    resetHouseInfo,
    onHouseChange,
    houses,
    flat,
    onFlatChange,
    submitButtonText,
    onSubmit,
  } = props;
  return (
    <div className={cx('lk-internet__popup')}>
      <h2 className={cx('lk-internet__popup-title', 'lk-internet__popup-title--centered')}>{title}</h2>
      <p className={cx('lk-internet__popup-title-note')}>{description}</p>
      <h3 className={cx('lk-internet__popup-subtitle', 'lk-internet__popup-subtitle--centered')}>
        Новый адрес
      </h3>
      <form action="" className={cx('lk-page-popup__relocation-form')}>
        <div className={cx('lk-page-popup__form-row')}>
          <div className={cx('lk-page-popup__form-cell')}>
            <div className={cx('lk-page-popup__form-label')}>Населенный пункт</div>
          </div>
          <div className={cx('lk-page-popup__form-cell')}>
            <TextInput className={cx('relocation-popup__input')} value={region.label} disabled />
          </div>
        </div>
        <div className={cx('lk-page-popup__form-row')}>
          <div className={cx('lk-page-popup__form-cell')}>
            <div className={cx('lk-page-popup__form-label')}>Адрес</div>
          </div>
          <div className={cx('lk-page-popup__form-cell')}>
            <AutocompleteInput
              value={street}
              items={streets}
              itemCaptionExtractor={item => item.label}
              filter={(value, items) => items}
              onFetchRequested={fetchStreets}
              onClearRequested={resetStreetInfo}
              onChange={onStreetChange}
              className={cx('relocation-popup__input')}
            />
          </div>
        </div>
        <div className={cx('lk-page-popup__relocation-form--houses-flats-rows')}>
          <div className={cx('lk-page-popup__form-row', 'lk-page-popup__relocation-form--houses-flats-row')}>
            <div className={cx('lk-page-popup__form-cell')}>
              <div className={cx('lk-page-popup__form-label')}>Дом, корпус</div>
            </div>
            <div className={cx('lk-page-popup__form-cell')}>
              <AutocompleteInput
                value={house}
                items={houses}
                itemCaptionExtractor={item => item.label}
                filter={(value, items) => items}
                onFetchRequested={fetchHouses}
                onClearRequested={resetHouseInfo}
                onChange={onHouseChange}
                disabled={!street}
                className={cx('lk-page-popup__input-120')}
              />
            </div>
          </div>
          <div className={cx('lk-page-popup__form-row')}>
            <div className={cx('lk-page-popup__form-cell')}>
              <div className={cx('lk-page-popup__form-label')}>Квартира</div>
            </div>
            <div className={cx('lk-page-popup__form-cell')}>
              <TextInput
                value={flat}
                onChange={onFlatChange}
                mask="____"
                className={cx('lk-page-popup__input-60')}
              />
            </div>
          </div>
        </div>
        <div className={cx('lk-internet__popup-btn-container', 'lk-internet__popup-btn-container--wide-btn')}>
          <Button
            onClick={onSubmit}
            disabled={!house.id || !flat}
            className={cx('big', 'lk-internet__popup-btn-big')}
            // className={'big'}
          >
            {submitButtonText}
          </Button>
        </div>
      </form>
    </div>
  );
};
