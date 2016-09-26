import { PropTypes } from 'react';
import ReactCalendarTimeline from 'react-calendar-timeline';
import moment from 'moment';
import styles from './Timeline.scss';

const Timeline = ({groups, items}) => (
  <div className={styles.container}>
    <ReactCalendarTimeline groups={groups}
        items={items}
        timeSteps={{
          second: 1,
          minute: 15,
          hour: 1,
          day: 1,
          month: 1,
          year: 1
        }}
        defaultTimeStart={moment().add(-12, 'hour')}
        defaultTimeEnd={moment().add(12, 'hour')}
    />
  </div>
);

Timeline.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.object).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Timeline;
