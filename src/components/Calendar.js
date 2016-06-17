import moment from 'moment';
import _ from 'lodash';
import './Calendar.scss';
import VisibleCalendarCell from './VisibleCalendarCell';

export default () => (
  <table className="calendar">
    <thead>

    </thead>
    <tbody>
      { _.map(_.range(7), day => (<tr key={`day_${day}`}>
          { _.map(_.range(24), hour =>
            <td key={`hour_${hour}`}><VisibleCalendarCell day={day} hour={hour} /></td>) }
        </tr>)) }
    </tbody>
  </table>
);
