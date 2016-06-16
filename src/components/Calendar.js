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
            <VisibleCalendarCell key={`hour_${hour}`} day={day} hour={hour} />) }
        </tr>)) }
    </tbody>
  </table>
);
