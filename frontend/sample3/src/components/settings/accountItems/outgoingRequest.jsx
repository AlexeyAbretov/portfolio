/* eslint react/no-danger: 0 */

import React from 'react';
import Button from '../../button';
import HideAwaiter from '../../awaiters/hide';
import { OperationStatus } from '../../../consts';
import Utils from '../../../utils';

export default class OutgoingRequest extends React.Component {
  constructor(props) {
    super(props);

    this.OnCancelRequestClick = this.OnCancelRequestClick.bind(this);

    this.state = { showAwaiter: false };
  }

  OnCancelRequestClick() {
    if (this.props.cancelRequest) {
      this.props.cancelRequest(this.props.number);
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
            <Button text={texts.reject} cssClass="sub label" click={this.OnCancelRequestClick} />
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
