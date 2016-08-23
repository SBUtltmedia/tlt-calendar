import { PropTypes, Component, createClass } from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import _ from 'lodash';
import { getItemsInSlot } from '../utils/calendar';
import { dayMinus1, hourMinus1 } from '../utils/time';
import { Overlay } from 'react-bootstrap';
import styles from './CalendarCell.scss';
import Dimensions from 'react-dimensions';
import { halfCssSize } from '../utils/style.js';
import { CALENDAR_ITEM } from '../constants/DraggableTypes';
import { HOUR, HALF_HOUR } from '../constants/Constants';
import onClickOutside from 'react-onclickoutside';

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  getClass: _.bind(getCellClass, {}, monitor),
  isDragging: () => !!monitor.getItem()
});

function createTarget(minute) {
  return {
    drop(props, monitor) {
      const {placeItem, moveItem, day, hour} = props;
      const item = monitor.getItem();
      if (item.day !== null && item.day !== undefined) {  // If it's already placed somewhere on the calendar grid
        moveItem(item, {...item, day, hour, minute});
      }
      else {
        placeItem({...item, day, hour, minute});
      }
    },
    canDrop(props, monitor) {
      return !monitor.getItem().disabled;
    }
  };
}

function getCellClass(monitor, {isOver, canDrop}) {
  const hasItem = !!monitor.getItem();
  var c = hasItem ? 'dragging ' : '';
  if (isOver && canDrop) { return c + 'over'; }
  if (isOver && !canDrop) { return c + 'reject'; }
  return c;
}

const OverlayComponent = onClickOutside(createClass({
  handleClickOutside: function(evt) {
    this.props.handleClickOutside(evt);
  },
  render: function() {
    const {show, container, popover, containerWidth, children} = this.props;
    return <div className='overlay' style={{height: `${containerWidth * 4 + 4}px`}}>{children}</div>;
  }
}));

function getTickValues(items, minute) {
  const tickItems = _.find(items, item => item.minute === minute);
  return tickItems ? tickItems.value : [];
}

const Tick = ({col, row, className}) => (
  <rect width='19' height='5' x={col === 0 ? 4 : 26} y={row * 10 + 5} className={className} />
);

const Ticks = ({items, onClick, max, isActive, activeMinute}) => {
  const getTickClass = (items, minute) => isActive && activeMinute === minute ?
                        'active' : (_.size(items) >= max ? 'filled' : 'unfilled');
  const leftItems = getTickValues(items, 0);
  const rightItems = getTickValues(items, 30);
  return <svg className="item ticks" xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox="0 0 50 50" className='ticks'>
    <g>
      {_.map(leftItems, (item, i) => <Tick col={0} row={i} key={i} className={getTickClass(leftItems, 0)} />)}
      {_.map(rightItems, (item, i) => <Tick col={1} row={i} key={i} className={getTickClass(rightItems, 30)} />)}
      <rect width='25' height='50' x='0' y='0' style={{fillOpacity:0}} onClick={() => onClick(leftItems, 0)} />
      <rect width='25' height='50' x='25' y='0' style={{fillOpacity:0}} onClick={() => onClick(rightItems, 30)} />
    </g>
  </svg>;
};

@DropTarget(CALENDAR_ITEM, createTarget(0), collect)
class FullCell extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    day: PropTypes.number.isRequired,
    hour: PropTypes.number.isRequired,
    placeItem: PropTypes.func.isRequired,
    moveItem: PropTypes.func.isRequired,
    fillInfoBox: PropTypes.func.isRequired,
    clearInfoBox: PropTypes.func.isRequired,
    cellComponent: PropTypes.func.isRequired,
    items: PropTypes.object.isRequired,
    popover: PropTypes.func,
    defaultGranularity: PropTypes.number,
    overrideMultiplesFn: PropTypes.func,
    disabled: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      showPopover: false
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.state.showPopover) {
      const items = getTickValues(newProps.cellItems, this.state.popoverMinute);
      if (_.isEmpty(items)) {
        this.setState({showPopover: false});
      }
      else {
        this.setState({popoverItems: items});
      }
    }
  }

  renderPopover() {
    const {popover, day, hour} = this.props;
    return popover ?
    <Overlay show={this.state.showPopover} container={this} placement='right'>
      <OverlayComponent {...this.props} handleClickOutside={evt => this.setState({showPopover: false})}>
        {popover({items: this.state.popoverItems, day, hour, minute: this.state.popoverMinute})}
      </OverlayComponent>
    </Overlay> : '';
  }

  onMouseEnter() {
    const {fillInfoBox, cellItems} = this.props;
    fillInfoBox({...this.props, cellItems});
  }

  onMouseLeave() {
    const {clearInfoBox} = this.props;
    clearInfoBox();
  }

  shouldUseTicks() {
    const {cellItems} = this.props;
    return !_.isEmpty(cellItems) && _.isArray(cellItems[0].value);
  }

  calculateMarginLeft(item) {
    const {containerWidth, cellComponent, disabled, hour} = this.props;
    const {minute, visibleDuration, duration} = item;
    const startsOnHalf = minute % 60 === 30;
    if (startsOnHalf) {
      return halfCssSize(containerWidth);
    }
    else if (duration !== visibleDuration && hour === 0 && minute === 0) {
      return 0 - containerWidth * (duration - visibleDuration) / 60;
    }
    else {
      return '';
    }
  }

  renderCellItem(item, i) {
    const {containerWidth, cellComponent, disabled, hour} = this.props;
    const {visibleDuration} = item;
    //const width = visibleDuration === HALF_HOUR ? halfCssSize(containerWidth) : containerWidth;
    const marginLeft = this.calculateMarginLeft(item);
    const overflow = visibleDuration === HALF_HOUR ? 'hidden' : '';
    const position = visibleDuration === HALF_HOUR ? 'absolute' : '';
    const style = {marginLeft, overflow, position, /* float: startsOnHalf === 30 ? 'left' : 'right' */};
    return cellComponent({...item, disabled, style, key: i, size: containerWidth, className: 'item'});
  }

  render() {
    const {connectDropTarget, day, hour, items, clearInfoBox, containerWidth, getClass, isDragging, coverage, cellItems} = this.props;
    const html = <div className={`cell full ${getClass(this.props)}`}
    style={{width:`${containerWidth}px`, height: `${containerWidth}px`}}
    onMouseEnter={this.onMouseEnter.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)}>
      {this.shouldUseTicks() ?
        <Ticks items={cellItems} max={coverage} isActive={this.state.showPopover} activeMinute={this.state.popoverMinute}
        onClick={(items, minute) => this.setState({showPopover: true, popoverItems: items, popoverMinute: minute})} /> :
        _.map(cellItems, this.renderCellItem.bind(this))}
      {this.renderPopover()}
    </div>;
    return isDragging ? connectDropTarget(html) : html;
  }
}

@DropTarget(CALENDAR_ITEM, createTarget(30), collect)
class HalfCell extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    side: PropTypes.string.isRequired,
    placeItem: PropTypes.func.isRequired,
    moveItem: PropTypes.func.isRequired
  };
  render () {
    const { getClass, connectDropTarget, side, isDragging } = this.props;
    const html = <div className={`cell half ${side} ${getClass(this.props)}`}></div>;
    return isDragging ? connectDropTarget(html) : html;
  }
}

const DimensionedFullCell = Dimensions()(FullCell);

class CalendarCell extends Component {
  static propTypes = {
    day: PropTypes.number.isRequired,
    hour: PropTypes.number.isRequired
  };

  shouldComponentUpdate(nextProps, nextState) {  // For render efficiency
    return !_.isEqual(this.props.cellItems, nextProps.cellItems);
  }

  render() {
    const { day, hour } = this.props;
    return <div className={styles.container}>
      { hour === 0 ?
        <HalfCell side="left" {..._.assign({}, this.props, {day: dayMinus1(day), hour: hourMinus1(hour)})} />
      : ''}
        <HalfCell side="right" {...this.props} />
      <DimensionedFullCell {...this.props} />
    </div>;
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {items, day, hour, defaultGranularity, overrideMultiplesFn} = ownProps;
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    cellItems: getItemsInSlot(items, {day, hour}, {defaultGranularity, overrideMultiplesFn})
  };
};

export default connect(
  state => ({}),
  {},
  mergeProps
)(CalendarCell);
