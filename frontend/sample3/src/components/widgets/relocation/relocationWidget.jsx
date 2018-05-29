import React from 'react';
import Portal from 'components/portal';
import { Popup } from 'components/vendor-ui';
import AddressPage from './addressPage';
import ConfirmationPage from './confirmationPage';
import NotAvailablePage from './notAvailablePage';
import ErrorPage from './errorPage';

const Pages = {
  Address: 0,
  Confirmation: 1,
  NotAvailable: 2,
};

const description = (`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed laudantium ut,
deserunt nobis adipisci facilis minima iste in, voluptas itaque modi ipsa
mollitia quod ipsam voluptate molestiae iusto qui saepe molestias id nostrum.
Ab numquam iste, eveniet tempore expedita pariatur ducimus iusto architecto`);

class RelocationWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: Pages.Address,
      street: { label: '' },
      house: { label: '' },
      region: {
        id: props.regionId,
        label: props.regionName
      }
    };
  }

  resetStreetInfo = () => {
    this.setState({ street: { label: '' }, house: { label: '' } });
  }

  fetchStreets = (value) => {
    console.log('fetch streets');
    this.resetStreetInfo();
    this.props.fetchStreets(value);
  }

  resetHouseInfo = () => {
    this.setState({ house: { label: '' } });
  }

  fetchHouses = (value) => {
    console.log('fetch houses');
    this.resetHouseInfo();
    this.props.fetchHouses(this.state.street.id, value);
  }

  checkAddress = (event) => {
    event.preventDefault();
    if (this.state.house) {
      const nextPage = this.state.house.isConnected ? Pages.Confirmation : Pages.NotAvailable;
      this.setState({ currentPage: nextPage });
    }
  }

  createRelcoationRequest = (event) => {
    event.preventDefault();
    this.props.createRelocationRequest({
      fullAddress: `Москва, ${this.state.street.label}, ${this.state.house.label}, кв ${this.state.flat}`,
      houseId: this.state.house.id,
      flat: this.state.flat,
      phone: this.state.phone.replace(/\s/g, '')
    });
  }

  renderAddressPage() {
    const { streets, houses } = this.props;
    return (
      <AddressPage
        title="«Услуга «Переезд»"
        description={description}
        submitButtonText="Проверить доступность подключения"
        onSubmit={this.checkAddress}
        region={this.state.region}
        street={this.state.street}
        fetchStreets={this.fetchStreets}
        resetStreetInfo={this.resetStreetInfo}
        onStreetChange={value => this.setState({ street: value })}
        streets={streets}
        house={this.state.house}
        fetchHouses={this.fetchHouses}
        resetHouseInfo={this.resetHouseInfo}
        onHouseChange={value => this.setState({ house: value })}
        houses={houses}
        flat={this.state.flat}
        onFlatChange={value => this.setState({ flat: value })}
      />
    );
  }

  renderConfirmationPage() {
    return (
      <ConfirmationPage
        title="Подключение доступно"
        titleIconUrl="http://static.vendordev.ru/upload/images/home/profile/emoji_smile.png"
        description={description}
        submitButtonText="Оставить заявку"
        onSubmit={this.createRelcoationRequest}
        onBackClick={(event) => { event.preventDefault(); this.setState({ currentPage: Pages.Address }); }}
        phone={this.state.phone}
        onPhoneChange={(value) => { this.setState({ phone: value }); }}
        disableSubmit={!this.state.phone || this.state.phone.length !== 16}
      />
    );
  }

  renderNotAvailablePage() {
    return (
      <NotAvailablePage
        title="Подключение не доступно"
        titleIconUrl="http://static.vendordev.ru/upload/images/home/profile/sad-face.png"
        description={description}
        submitButtonText="Закрыть"
        onSubmit={this.props.closeRelocationDialog}
        onBackClick={(event) => { event.preventDefault(); this.setState({ currentPage: Pages.Address }); }}
      />
    );
  }

  renderError() {
    return (
      <ErrorPage
        title="Ошибка"
        description="При отправке заявки произошла ошибка, пожалуйста, повторите попытку позже"
        submitButtonText="Закрыть"
        onSubmit={this.props.closeRelocationDialog}
        onBackClick={(event) => { event.preventDefault(); this.setState({ currentPage: Pages.Address }); }}
      />
    );
  }

  renderContent() {
    switch (this.state.currentPage) {
      case Pages.Address: {
        return this.renderAddressPage();
      }
      case Pages.Confirmation: {
        return this.renderConfirmationPage();
      }
      case Pages.NotAvailable: {
        return this.renderNotAvailablePage();
      }
      default: {
        return null;
      }
    }
  }

  render() {
    const { closeRelocationDialog } = this.props;
    return (
      <Portal>
        <Popup onClose={closeRelocationDialog} opened>
          {
            this.props.showError
              ? this.renderError()
              : this.renderContent()
          }
        </Popup>
      </Portal>
    );
  }

}

export default RelocationWidget;
