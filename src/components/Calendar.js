import BigCalendar from 'react-big-calendar';
import moment from 'moment';
require('react-big-calendar/lib/css/react-big-calendar.css');

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

export default ({ events }) => (
  <div>
    <BigCalendar
      events={events}
      startAccessor='startDate'
      endAccessor='endDate'
    />
  </div>
);
