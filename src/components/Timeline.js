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
  static propTypes = {
    type: PropTypes.string.isRequired,
    groups: PropTypes.arrayOf(PropTypes.object).isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    className: PropTypes.string,
    Modal: PropTypes.func,
    addSteps: React.PropTypes.func.isRequired,
    addTooltip: React.PropTypes.func.isRequired,
    joyrideOverlay: React.PropTypes.bool.isRequired,
    joyrideType: React.PropTypes.string.isRequired,
    onClickSwitch: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      modalGroup: null,
      modalItem: null
    }
    props.fetchTimelineItems(props.type);
  }


  componentDidMount() {
    /* this.props.addSteps({
     text: 'React Joyride is a ReactJS component for creating tours for your app.<br/><br/>It is fully responsive and customizable.',
     selector: '.intro',
     position: 'bottom'
     }); */

    this.props.addTooltip({
      title: 'Standalone Tooltips',
      text: '<h2 style="margin-bottom: 10px; line-height: 1.6">Now you can open tooltips independently!</h2>And even style them one by one!',
      selector: '.intro h3 a',
      position: 'bottom',
      event: 'hover',
      style: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: 0,
        color: '#fff',
        mainColor: '#ff67b4',
        textAlign: 'center',
        width: '29rem'
      }
    });

    this.props.addTooltip({
      text: 'Change how you want to play the tour',
      selector: '.sw-right',
      trigger: '.sw-right span a',
      position: 'bottom',
      style: {
        backgroundColor: '#E6F212',
        borderRadius: '0.5rem',
        color: '#000',
        textAlign: 'center',
        width: '18rem'
      }
    });
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
    const {Modal, groups, items, type, className='', disabled, joyrideType, onClickSwitch} = this.props;
    const {modalIsOpen, modalItem} = this.state;
    const doNothing = () => {};
    return <div className={`${styles.container} ${className} ${disabled ? 'disabled' : ''}`}>

  <div className="switch-wrapper sw-right">
    <span>Tour Type<a href="#"><i className="fa fa-question-circle" /></a></span>

    <div className="switch">
      <a
        href="#" className={joyrideType === 'continuous' ? 'active' : ''}
        data-key="joyrideType"
        data-type="continuous"
        onClick={onClickSwitch}>Continuous</a>
      <a
        href="#" className={joyrideType === 'single' ? 'active' : ''}
        data-key="joyrideType"
        data-type="single"
        onClick={onClickSwitch}>Single</a>
    </div>
  </div>
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
          canMove={!disabled}
          canChangeGroup={!disabled}
          canResize={!disabled}
          onCanvasDoubleClick={disabled ? doNothing : this.onCanvasClick.bind(this)}
          onItemMove={disabled ? doNothing : this.onItemMove.bind(this)}
          onItemResize={disabled ? doNothing : this.onItemResize.bind(this)}
          onItemClick={disabled ? doNothing : this.onItemClick.bind(this)}
          defaultTimeStart={moment().add(-12, 'hour')}
          defaultTimeEnd={moment().add(12, 'hour')}
      />
      <Modal type={type} open={modalIsOpen} item={modalItem} onClose={() => this.setState({modalIsOpen: false})} />
    </div>;
  }
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
