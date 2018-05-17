import React from 'react';

import Request from './request';
import Success from './results/success';
import Fail from './results/fail';

export default (props) => {
    return <div>
        <Request key="request" />
        <Success key="success" />
        <Fail key="fail" />
    </div>;
}
