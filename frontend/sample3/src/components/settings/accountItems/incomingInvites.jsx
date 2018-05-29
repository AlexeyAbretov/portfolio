/* eslint react/no-danger: 0 */

import React from 'react';

import PseudoLink from 'components/link/pseudo';

import { OperationStatus } from 'consts';
import Utils from 'utils';

import Button from '../../button';
import HideAwaiter from '../../awaiters/hide';

export default class IncomingInvites extends React.Component {
  constructor(props) {
    super(props);

    this.OnAcceptInviteClick = this.OnAcceptInviteClick.bind(this);
    this.OnRejectInviteClick = this.OnRejectInviteClick.bind(this);

    this.state = { showAwaiter: false };
  }

  OnAcceptInviteClick() {
    if (this.props.acceptInvite) {
      this.props.acceptInvite(this.props.number);
      this.setState({ showAwaiter: true });
    }
  }

  OnRejectInviteClick() {
    if (this.props.rejectInvite) {
      this.props.rejectInvite(this.props.number);
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
            <Button text={texts.accept} cssClass="sub label" click={this.OnAcceptInviteClick} />
            <span className="or">или</span>
            <PseudoLink text={texts.reject} click={this.OnRejectInviteClick} />
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
