import Timeline from 'react-calendar-timeline';
import moment from 'moment';

export default ({groups, items}) => (
  <div>
    <Timeline groups={groups}
              items={items}
              defaultTimeStart={moment().add(-12, 'hour')}
              defaultTimeEnd={moment().add(12, 'hour')}
              />
  </div>
);
