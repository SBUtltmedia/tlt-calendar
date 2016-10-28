import { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import ReactCalendarTimeline from 'react-calendar-timeline';
import moment from 'moment';
import styles from './Timeline.scss';
import {fetchTimelineItems, resizeItem, moveItem} from '../actions/TimelineActions';
//import key from 'keymaster';

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
      modalItem: null
    }
    props.fetchTimelineItems(props.type);
  }

  /*
  componentDidMount() {
    key('delete, backspace', (event, handler) => {
      console.log("I am the keymaster!");
    });
  }
  */

  findItem(itemId) {
    return _.find(this.props.items, item => item.id === itemId);
  }

  onCanvasClick(time, group) {
    const start_time = moment(time);
    this.setState({
      modalIsOpen: true,
      modalItem: {
        group: group.id,
        start_time,
        end_time: start_time.clone().add(1, 'hours')
      }
    });
  }

  onItemMove(itemId, dragTime, newGroupOrder) {
    this.props.moveItem(itemId, dragTime, newGroupOrder);
  }

  onItemResize(itemId, newResizeEnd) {
    this.props.resizeItem(itemId, newResizeEnd);
  }

  onItemClick(itemId, e) {
    this.setState({
      modalIsOpen: true,
      modalItem: this.findItem(itemId)
    });
  }

  render() {
    const {Modal, groups, items, type, className=''} = this.props;
    const {modalIsOpen, modalItem} = this.state;
    return <div className={`${styles.container} ${className}`}>
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
          stackItems={true}
          sidebarWidth={200}
          onCanvasDoubleClick={this.onCanvasClick.bind(this)}
          onItemMove={this.onItemMove.bind(this)}
          onItemResize={this.onItemResize.bind(this)}
          onItemClick={this.onItemClick.bind(this)}
          defaultTimeStart={moment().add(-12, 'hour')}
          defaultTimeEnd={moment().add(12, 'hour')}
      />
      <Modal type={type} open={modalIsOpen} item={modalItem} onClose={() => this.setState({modalIsOpen: false})} />
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

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchTimelineItems: () => dispatch(fetchTimelineItems(ownProps.type)),
  resizeItem: (itemId, newResizeEnd) => dispatch(resizeItem(ownProps.type, itemId, newResizeEnd)),
  moveItem: (itemId, dragTime, newGroupOrder) => dispatch(moveItem(ownProps.type, itemId, dragTime, newGroupOrder))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);
