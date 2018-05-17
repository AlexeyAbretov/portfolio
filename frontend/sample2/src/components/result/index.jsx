import React from 'react';

export default (props) => {
    if (!props.isVisible) {
        return null;
    }

    return (<div>
        <div dangerouslySetInnerHTML={{ __html: props.content }}></div>
        <div className="shpd-lite-request_bg-image-box shpd-lite-request_tnx-page-bg-container">
            <div dangerouslySetInnerHTML={{ __html: props.background }}></div>
        </div>
    </div>);
}