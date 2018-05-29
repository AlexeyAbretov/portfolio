/* eslint jsx-a11y/no-static-element-interactions:0 */

import classNames from 'classnames/bind';
import popupStyle from 'components/popup/styles.css';
import Portal from 'components/portal';
import { Button, Loader, Popup } from 'components/vendor-ui';
import { OperationStatus } from 'consts';

const cx = classNames.bind(popupStyle);

const PayPopup = (props) => {
  const { status, success, fail, pay, text, okText, cancelText, closePopup, isShow } = props;
  const popup = (() => {
    switch (status) {
      case OperationStatus.Pending:
        return (<div><Loader size="small" active lastIcon="clock" timeout={250}>{[]}</Loader></div>);
      case OperationStatus.Success:
        return (<div>{success}</div>);
      case OperationStatus.Fail:
        return (<div>{fail}</div>);
      default:
        return (<div>
          <h2 className={cx('lk-internet__popup-title')}>{text}</h2>
          <Button onClick={pay}>
            {okText}
          </Button>
          <span
            className={cx('lk-internet__popup-inline-dynamic')}
            onClick={closePopup}
          >
            {cancelText}
          </span>
        </div>);
    }
  })();

  return (
    <Portal>
      <Popup opened={isShow} onClose={closePopup}>
        {popup}
      </Popup>
    </Portal>
  );
};

export default PayPopup;
