import { PropTypes } from 'react';
import _ from 'lodash';
import styles from './CalendarGrid.scss';
import CalendarCell from './CalendarCell';
import { getHourLabel } from '../utils/time';
import { SHORT_DAYS } from '../constants/Settings';

const CalendarGrid = props => (
  <div className={styles.container}>
    <table className="calendar">
      <thead>
        <tr>
          { _.map(_.range(26), i => <td key={i}><div className="hour-label">{i === 0 ? '' : getHourLabel(i - 1)}</div></td>) }
        </tr>
      </thead>
      <tbody>
        { _.map(SHORT_DAYS, (day, i) => (<tr key={i}>
          <td>{day}</td>
          { _.map(_.range(24), hour => <td key={hour}><CalendarCell {...props} day={i} hour={hour} /></td>) }
          <td>{day}</td>
        </tr>)) }
      </tbody>
    </table>
  </div>
)

CalendarGrid.propTypes = {
  placeItem: PropTypes.func.isRequired,
  fillInfoBox: PropTypes.func.isRequired,
  clearInfoBox: PropTypes.func.isRequired,
  cellComponent: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired,
  disabled: PropTypes.bool
};

export default CalendarGrid;
