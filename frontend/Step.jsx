import React from 'react';

import {
    FlexBox,
    CardContainer,
    SimpleText,
    Image,
} from 'ui/atoms';

import {
    OpenFileButton,
} from 'ui/molecules';

export const Step = ({
    stepCounterProps = {},
    titleProps = {},
    containerProps = {},
    noteProps = {},
    imageProps = {},
    onSelectFileClick,
    selectFileButtonProps = {},
    closeProps = {},
    type = '',
    onClose,
} = {}) => (
    <CardContainer
        p="25px 15px"
        borderRadius="16px"
        {...containerProps || {}}
    >
        <FlexBox
            justifyContent="center"
            position="relative"
        >
            <SimpleText
                color="primary"
                fontSize="16px"
                fontWeight={400}
                position="absolute"
                left="0"
                cursor="pointer"
                onClick={onClose}
                {...closeProps || {}}
            />
            <SimpleText
                color="text"
                fontSize="16px"
                fontWeight={700}
                {...stepCounterProps || {}}
            />
        </FlexBox>
        <FlexBox
            flexDirection="column"
            pr="16px"
        >
            <SimpleText
                color="black"
                fontSize="32px"
                fontWeight="bold"
                fontFamily="Squad"
                mt="20px"
                lineHeight="40px"
                {...titleProps || {}}
            />
            <SimpleText
                color="black"
                fontSize="16px"
                mt="16px"
                lineHeight="24px"
                {...noteProps || {}}
            />
            <Image
                alt="step"
                mt="24px"
                {...imageProps || {}}
            />
        </FlexBox>
        <OpenFileButton
            onOpenFile={({ file } = {}) => onSelectFileClick && onSelectFileClick({
                file, type,
            })}
            data-testid="passport-changes-step-select-file-button"
            {...selectFileButtonProps || {}}
        />
    </CardContainer>
);

<Step
    stepCounterProps={{
        text: 'Шаг 1 из 3',
    }}
    titleProps={{
        text: 'Обновить паспортные данные',
    }}
    noteProps={{
        text: 'Откройте ваш паспорт на развороте с фото. <br /> Необходимо будет сделать снимок камерой <br />вашего телефона.',
    }}
    imageProps={{
        src: Step1Image,
        maxWidth: '286px',
        maxHeight: '380px',
    }}
    selectFileButtonProps={{
        text: 'Выбрать файл',
    }}
    closeProps={{
        text: 'Закрыть',
    }}
    onClose={() => alert('close')}
/>
