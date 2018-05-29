/* eslint jsx-a11y/no-noninteractive-element-to-interactive-role: 0 */
/* eslint jsx-a11y/no-noninteractive-element-interactions: 0 */

import React from 'react';
import classNames from 'classnames/bind';

import PseudoLink from 'components/link/pseudo';

import
  Button,
  { ButtonType } from '../button';

import styles from './styles.css';

const cx = classNames.bind(styles);

export default class RequestListItemDetails extends React.Component {

  constructor(props) {
    super(props);

    this.onStateClick = this.onStateClick.bind(this);
    this.statuses = {  // todo уточнить расшифровку статусов
      OPEN: 'Создана',
      COMPLETE: 'Обработана',
      REJECTED: 'Отклонена',
      IN_PROGRESS: 'Выпоняется',
      PENDING: 'Пауза',
      PARTIALLY_COMPLETE: 'Частично обработана'
    };
  }

  onStateClick(index) {
    this.setState({ activeStateIndex: index });
  }


  render() {
    const props = this.props;
    if (!props.details) {
      return null;
    }

    if (!this.state) {
      this.state = { activeStateIndex: props.details.states.length - 1 };
    }

    const state = this.state;

    let curStateComment = null;
    const states = props.details.states.map((s, i) => {
      const liCssClass = classNames({
        active: i === state.activeStateIndex,
        larrow: i > 0
      });

      const spanCssClass = classNames({
        'dynamic lh100': i !== state.activeStateIndex
      });

      if (i === state.activeStateIndex) {
        curStateComment = s.comment;
      }

      return (
        <li
          key={s.stateInd}
          onClick={() => this.onStateClick(i)}
          className={cx('list-style-reset', liCssClass)}
        >
          <span className={spanCssClass}>{this.statuses[s.status]}</span>
        </li>
      );
    });

    return (
      <div>
        <div className="status-message">
          <ul>
            {states}
          </ul>
        </div>

        <div className="read">
          <p dangerouslySetInnerHTML={{ __html: curStateComment }} />
        </div>

        <div style={{ display: props.details.canClose ? 'block' : 'none' }}>
          <Button
            text="Подтвердить"
            type={ButtonType.Gray}
          />
          &nbsp;или&nbsp;
          <PseudoLink text="Отметить проблему как решенную" />
        </div>
        <div className="message-status question" style={{ display: 'none' }}>
          <div>
            <span>Решена ли ваша проблема?</span>
            <ul>
              <li>
                <span className="dynamic">Да, решена</span>
              </li>
              <li>
                <span className="dynamic" >Нет, еще не решена</span>
              </li>
              <li>
                <span className="dynamic" >Проблема уже не актуальна</span>
              </li>
            </ul>
          </div>

          <div className="message-status resolve" style={{ display: 'none' }}>
            <span>Проблема решена</span>
          </div>
          <div className="message-status problem-actual" style={{ display: 'none' }}>
            <span className="dynamic">Проблема снова актуальна</span>
          </div>
        </div>

      </div>

    );
  }
}
