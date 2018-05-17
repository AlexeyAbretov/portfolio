import React from 'react';

export default (props) => {
    const { text, isVisible } = props;

    if (!isVisible) {
        return null;
    }

    return (
        <div
            className="shpd-lite-request_form-tip"
            dangerouslySetInnerHTML={{ __html: text }}>
        </div>
    );
}
