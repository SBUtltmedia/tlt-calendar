import { PropTypes, Component } from 'react';
import ReactCalendarTimeline from 'react-calendar-timeline';
import moment from 'moment';
import styles from './Timeline.scss';
import AddItemPopup from './AddItemPopup';

const ONE_HOUR_IN_MS = 3600000;

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      modalGroup: null,
      modalStartTime: null,
      modalEndTime: null
    }
  }

  findItem(itemId) {
    return _.find(this.props.items, item => item.id === itemId);
  }

  onCanvasClick(groupId, time, e) {
    this.setState({
      modalIsOpen: true,
      modalGroup: groupId,
      modalStartTime: time,
      modalEndTime: time + ONE_HOUR_IN_MS
    });
  }

  onItemResize(itemId, newResizeEnd) {
    const item = this.findItem(itemId);
    // TODO: Send action with item
  }

  onItemSelect(itemId, e) {
    const item = this.findItem(itemId);
  }

  onItemClick(itemId, e) {
    const item = this.findItem(itemId);
    console.log(item);
    this.setState({
      modalIsOpen: true,
      modalGroup: item.group,
      modalStartTime: item.start_time,
      modalEndTime: item.end_time
    });
  }

  render() {
    const {groups, items} = this.props;
    const {modalIsOpen, modalGroup, modalStartTime, modalEndTime} = this.state;
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
          onCanvasClick={this.onCanvasClick.bind(this)}
          onItemResize={this.onItemResize.bind(this)}
          onItemSelect={this.onItemSelect.bind(this)}
          onItemClick={this.onItemClick.bind(this)}
          defaultTimeStart={moment().add(-12, 'hour')}
          defaultTimeEnd={moment().add(12, 'hour')}
      />
      <AddItemPopup open={modalIsOpen} location={modalGroup} startTime={modalStartTime} endTime={modalEndTime}
                    onClose={() => this.setState({modalIsOpen: false})} />
    </div>;
  }
}

Timeline.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.object).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Timeline;
