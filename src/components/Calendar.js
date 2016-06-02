import BigCalendar from 'react-big-calendar';
import moment from 'moment';
require('react-big-calendar/lib/css/react-big-calendar.css');

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const myEventsList = [];

export default props => (
  <div>
    <BigCalendar
      events={myEventsList}
      startAccessor='startDate'
      endAccessor='endDate'
    />
  </div>
);
