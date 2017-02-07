import { PropTypes } from 'react';
import _ from 'lodash';
import styles from './HourPreferencesGrid.scss';
import HourPreferencesGridCell from './HourPreferencesGridCell';
import { getHourLabel } from '../utils/time';
import { SHORT_DAYS } from '../constants/Settings';

export default props => (
  <div className={styles.container}>
    <table className="calendar">
      <thead>
        <tr>
          { _.map(_.range(26), i => (
            <td key={i} colSpan="2">
              <div className="hour-label">{i === 0 ? '' : getHourLabel(i - 1)}</div>
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        { _.map(SHORT_DAYS, (day, i) => (<tr key={i}>
          <td colSpan="2">{day}</td>
          { _.map(_.range(48), col => (
            <td key={col}>
              <HourPreferencesGridCell
                {...props}
                day={i}
                hour={Math.floor(col / 2)}
                minute={col % 2 === 0 ? 0 : 30}
              />
            </td>
          )) }
          <td colSpan="2">{day}</td>
        </tr>)) }
      </tbody>
    </table>
  </div>
);
