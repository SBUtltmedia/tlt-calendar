import _ from 'lodash';
import styles from './CalendarGrid.scss';
import CalendarCell from './CalendarCell';
import { getHourLabel } from '../utils/time';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default props => (
  <div className={styles.container}>
    <table className="calendar">
      <thead>
        <tr>
          { _.map(_.range(26), i => <td key={i}><div className="hour-label">{i === 0 ? '' : getHourLabel(i - 1)}</div></td>) }
        </tr>
      </thead>
      <tbody>
        { _.map(DAYS, (day, i) => (<tr key={i}>
          <td>{day}</td>
          { _.map(_.range(24), hour => <td key={hour}><CalendarCell {...props} day={i} hour={hour} /></td>) }
          <td>{day}</td>
        </tr>)) }
      </tbody>
    </table>
  </div>
)