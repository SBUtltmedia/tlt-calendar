import { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import ReactCalendarTimeline from 'react-calendar-timeline';
import moment from 'moment';
import styles from './Timeline.scss';
import {fetchTimelineItems, resizeItem, moveItem} from '../actions/TimelineActions';
import key from 'keymaster';

const Menu = () => (
  <div className="menu">
    <i className="fa fa-trash" aria-hidden="true"></i>
  </div>
);

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      modalGroup: null,
      modalStartTime: null,
      modalEndTime: null
    }
    props.fetchTimelineItems(props.type);
  }

  componentDidMount() {
    key('delete, backspace', (event, handler) => {
      console.log("I am the keymaster!");
    });
  }

  findItem(itemId) {
    return _.find(this.props.items, item => item.id === itemId);
  }

  onCanvasClick(time, group) {
    const start_time = moment(time);
    this.setState({
      modalIsOpen: true,
      modalItemId: null,
      modalGroup: group.id,
      modalStartTime: start_time,
      modalEndTime: start_time.clone().add(1, 'hours')
    });
  }

  onItemMove(itemId, dragTime, newGroupOrder) {
    this.props.moveItem(itemId, dragTime, newGroupOrder);
  }

  onItemResize(itemId, newResizeEnd) {
    this.props.resizeItem(itemId, newResizeEnd);
  }

  onItemSelect(itemId, e) {
    const item = this.findItem(itemId);
  }

  onItemClick(itemId, e) {
    const item = this.findItem(itemId);
    this.setState({
      modalIsOpen: true,
      modalItemId: item.id,
      modalGroup: item.group,
      modalStartTime: item.start_time,
      modalEndTime: item.end_time
    });
  }

  render() {
    const {Modal, groups, items, addItem, removeItem, className=''} = this.props;
    const {modalIsOpen, modalItemId, modalGroup, modalStartTime, modalEndTime} = this.state;
    return <div className={`${styles.container} ${className}`}>
      <Menu />
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
          onCanvasDoubleClick={this.onCanvasClick.bind(this)}
          onItemMove={this.onItemMove.bind(this)}
          onItemResize={this.onItemResize.bind(this)}
          onItemSelect={this.onItemSelect.bind(this)}
          onItemClick={this.onItemClick.bind(this)}
          defaultTimeStart={moment().add(-12, 'hour')}
          defaultTimeEnd={moment().add(12, 'hour')}
      />
      <Modal open={modalIsOpen} location={modalGroup} startTime={modalStartTime} endTime={modalEndTime}
                    addItem={addItem} removeItem={removeItem}
                    itemId={modalItemId} onClose={() => this.setState({modalIsOpen: false})} />
    </div>;
  }
}

Timeline.propTypes = {
  type: PropTypes.string.isRequired,
  groups: PropTypes.arrayOf(PropTypes.object).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string,
  Modal: PropTypes.func,
}

const mapStateToProps = state => ({

});

export default connect(
  mapStateToProps,
  {fetchTimelineItems, resizeItem, moveItem}
)(Timeline);
