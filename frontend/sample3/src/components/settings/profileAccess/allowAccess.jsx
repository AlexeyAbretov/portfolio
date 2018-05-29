/* eslint react/prefer-stateless-function: 0 */
/* eslint react/no-danger: 0 */

import React from 'react';
import OutgoingInvites from './outgoingInvites';
import IncomingRequests from './incomingRequests';
import CheckboxWithLabel from '../../checkbox/withLabel';

export default class AllowAccess extends React.Component {
  constructor(props) {
    super(props);

    this.state = { toggleEditAccount: {}, activeLogin: undefined, showAwaiter: true };
  }

  render() {
    const texts = this.props.texts;

    const outgoingInvites = this.props.outgoingInvites.map(x =>
      (
        <OutgoingInvites
          key={x.destinationName}
          number={x.destinationName}
          awaiter={x.awaiter}
          cancelInvite={this.props.cancelInvite}
          texts={texts.outgoingInvite}
        />
      )
    );

    const incomingRequests = this.props.incomingRequests.map(x =>
      (
        <IncomingRequests
          key={x.initiatorName}
          number={x.initiatorName}
          awaiter={x.awaiter}
          acceptRequest={this.props.acceptRequest}
          rejectRequest={this.props.rejectRequest}
          texts={texts.incomingRequest}
        />
      )
    );

    return (
      <div className="allow-access">
        {incomingRequests}
        {outgoingInvites}
        <CheckboxWithLabel
          checked={this.props.enableRequestToLink}
          onChange={this.props.enableRequestToLinkChange}
          text={this.props.texts.enableRequestToLink}
        />
      </div>
    );
  }
}
