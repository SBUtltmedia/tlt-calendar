import { PropTypes, Component } from 'react';
import ReactCalendarTimeline from 'react-calendar-timeline';
import moment from 'moment';
import styles from './Timeline.scss';
import AddItemPopup from './AddItemPopup';

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      modalGroup: null,
      modalTime: null
    }
  }

  onCanvasClick(groupId, time, e) {
    this.setState({
      modalIsOpen: true,
      modalGroup: groupId,
      modalTime: time
    });
  }

  render() {
    const {groups, items} = this.props;
    const {modalIsOpen, modalGroup, modalTime} = this.state;
    return <div className={styles.container}>
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
          sidebarWidth={200}
          onCanvasClick={() => this.onCanvasClick()}
          defaultTimeStart={moment().add(-12, 'hour')}
          defaultTimeEnd={moment().add(12, 'hour')}
      />
    <AddItemPopup open={modalIsOpen} group={modalGroup} time={modalTime} />
    </div>;
  }
}

Timeline.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.object).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Timeline;
