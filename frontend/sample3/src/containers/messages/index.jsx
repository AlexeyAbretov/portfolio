import { connect } from 'react-redux';
import React from 'react';
import Menu from 'components/menu';
import {
  selectingMessageMenuItem,
  MarkNoticesAsReadRequested,
  DeleteNoticesRequested,
  RequestDetailsRequested
} from 'actions';
import RequestList from 'components/messages/requestList';
import NoticeList from 'components/messages/noticeList';
import RequestListItem from 'components/messages/requestListItem';
import NoticeListItem from 'components/messages/noticeListItem';
import {
  TOP_MENU_MESSAGES_ITEM_ID,
  MESSAGES_MENU_REQUESTS_ID,
  MESSAGES_MENU_NOTICES_ID
} from 'consts';

function mapStateToProps(state) {
  return {
    isVisible: state.visibilityTopMenu === TOP_MENU_MESSAGES_ITEM_ID,
    activeMenuItemId: state.messages.activeMenuItemId
      ? state.messages.activeMenuItemId
      : MESSAGES_MENU_REQUESTS_ID,
    notices: state.notices,
    requests: state.requests
  };
}

const mapDispatchToProps = dispatch => ({
  onMessageMenuItemClick: (id) => {
    dispatch(selectingMessageMenuItem(id));
  },

  onMarkAsRead(ids) {
    dispatch(MarkNoticesAsReadRequested(ids));
  },

  onRemoveNotice(ids) {
    dispatch(DeleteNoticesRequested(ids));
  },

  onLoadRequestDetails(requestId) {
    dispatch(RequestDetailsRequested(requestId));
  }
});

const otherGroupNotification = 0;

class Messages extends React.Component {

  constructor(props) {
    super(props);

    const menuItems = [{
      id: MESSAGES_MENU_REQUESTS_ID,
      title: 'Заявки'
    },
    {
      id: MESSAGES_MENU_NOTICES_ID,
      title: 'Уведомления'
    }];

    const requestFilterItems = [
      { text: 'Заказ оборудования', value: 1 },
      { text: 'Обращения в Службу поддержки', value: 2 },
      { text: 'Изменение сервиса', value: 3 },
      { text: 'Оплата и финансы', value: 4 },
      { text: 'Другое', value: otherGroupNotification }];

    const noticeFilterItems = [
      { text: 'Оплата и финансы', value: 4 },
      { text: 'Ограничение сервиса', value: 6 },
      { text: 'Управление договором', value: 7 }];

    this.state = { menuItems, requestFilterItems, noticeFilterItems };
  }

  renderRequests() {
    const props = this.props;

    if (props.activeMenuItemId !== MESSAGES_MENU_REQUESTS_ID) {
      return null;
    }


    const requests = (props.requests || []).map(m => (<RequestListItem
      loadDetails={this.props.onLoadRequestDetails}
      id={m.requestId}
      key={m.requestId}
      title={`${m.requestTitle} № ${m.requestId}`}
      createdAt={m.requestDate}
      details={m.details}
      userLogin={m.userLogin}
      loginDesc={m.loginDesc}
      filterTypes={m.filterTypes}
    />));

    return (<RequestList
      isVisible={props.activeMenuItemId === MESSAGES_MENU_REQUESTS_ID}
      filterItems={this.state.requestFilterItems}
    >
      {requests}
    </RequestList>);
  }

  renderNotices() {
    const props = this.props;

    if (props.activeMenuItemId !== MESSAGES_MENU_NOTICES_ID) {
      return null;
    }

    const notices = props.notices.map(m => (<NoticeListItem
      key={m.notificationId}
      id={m.notificationId}
      title={m.title}
      text={m.text}
      status={m.status}
      createdAt={m.creationDate}
      filterTypes={m.filterTypes}
    />));

    return (<NoticeList
      isVisible={props.activeMenuItemId === MESSAGES_MENU_NOTICES_ID}
      filterItems={this.state.noticeFilterItems}
      onMarkAsRead={props.onMarkAsRead}
      onRemove={props.onRemoveNotice}
      isArchive={props.notices.isArchive}
    >
      {notices}
    </NoticeList>);
  }

  render() {
    const props = this.props;

    if (!this.props.isVisible) {
      return null;
    }

    const notices = this.renderNotices();
    const requests = this.renderRequests();
    return (
      <div className="content-wrap">
        <h2>{props.notices.isArchive ? 'Архив' : 'Сообщения'}</h2>
        <Menu items={this.state.menuItems} click={props.onMessageMenuItemClick} active={props.activeMenuItemId} />
        {notices}
        {requests}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages);
