import React from 'react';

import {
    FlexBox,
    SimpleText,
} from 'ui/atoms';

import {
    SimpleIcon,
} from 'ui/molecules';

import DefaultIcon from './images/Cross.png';

export const ErrorTile = ({
    iconProps = {},
    titleProps = {},
    subTitleProps = {},
    ...props
} = {}) => (
    <FlexBox
        bg="backgroundWhiteWarn"
        width="100%"
        minHeight="100px"
        p="16px"
        borderRadius="16px"
        {...props}
    >
        <SimpleIcon
            src={DefaultIcon}
            width="24px"
            height="24px"
            {...iconProps || {}}
        />
        <FlexBox
            ml="10px"
            flexDirection="column"
        >
            <SimpleText
                fontWeight={700}
                fontSize="16px"
                mt="5px"
                {...titleProps || {}}
            />
            <SimpleText
                fontWeight={400}
                fontSize="14px"
                lineHeight="20px"
                mt="10px"
                color="textPrimaryLight"
                {...subTitleProps || {}}
            />
        </FlexBox>

    </FlexBox>
);
