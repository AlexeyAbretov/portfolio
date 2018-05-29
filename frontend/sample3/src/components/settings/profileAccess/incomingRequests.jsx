/* eslint react/no-danger: 0 */

import React from 'react';

import PseudoLink from 'components/link/pseudo';

import { OperationStatus } from 'consts';
import Utils from 'utils';

import Button from '../../button';
import HideAwaiter from '../../awaiters/hide';

export default class IncomingRequests extends React.Component {
  constructor(props) {
    super(props);

    this.OnAcceptRequestClick = this.OnAcceptRequestClick.bind(this);
    this.OnRejectRequestClick = this.OnRejectRequestClick.bind(this);

    this.state = { showAwaiter: false };
  }

  OnAcceptRequestClick() {
    if (this.props.acceptRequest) {
      this.props.acceptRequest(this.props.number);
      this.setState({ showAwaiter: true });
    }
  }

  OnRejectRequestClick() {
    if (this.props.rejectRequest) {
      this.props.rejectRequest(this.props.number);
      this.setState({ showAwaiter: true });
    }
  }

  render() {
    const texts = this.props.texts;
    const awaiterTexts = { ...texts.awaiter };
    awaiterTexts.Success = awaiterTexts.Success.replace('{number}', this.props.number);
    const message = Utils.getAwaiterMessage(this.props.awaiter.status, awaiterTexts);

    if (this.props.awaiter.status === OperationStatus.Success) {
      return (<HideAwaiter
        message={message}
        status={this.props.awaiter.status}
        showAwaiter={this.state.showAwaiter}
        hideAwaiter={() => this.setState({ showAwaiter: false })}
      />);
    }

    return (
      <div className="nota-bene-yellow-box nota-ding">
        <div>
          <p dangerouslySetInnerHTML={{ __html: texts.note.replace('{number}', this.props.number) }} />
          <div className="submit-or-cancel">
            <Button text={texts.accept} cssClass="sub label" click={this.OnAcceptRequestClick} />
            <span className="or">или</span>
            <PseudoLink text={texts.reject} click={this.OnRejectRequestClick} />
          </div>
        </div>
        <HideAwaiter
          message={message}
          status={this.props.awaiter.status}
          showAwaiter={this.state.showAwaiter}
          hideAwaiter={() => this.setState({ showAwaiter: false })}
          css={{ italic: true, 'message-text': true, 'valign-middle-cell': true }}
        />
      </div>
    );
  }
}
