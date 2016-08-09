import { PropTypes, Component, createClass } from 'react';
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

function createTarget(minute) {
  return {
    drop(props, monitor) {
      const item = monitor.getItem();
      if (item.day !== null && item.day !== undefined) {  // If it's already placed somewhere on the calendar grid
        props.removeItem(item);
      }
      props.placeItem(_.assign({}, item, props, {minute}));
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
    const {show, container, popover, containerWidth} = this.props;
    return <div className='overlay' style={{height: `${containerWidth * 4 + 4}px`}}>{popover}</div>;
  }
}));

const Tick = ({item, col, row, color}) => (
  <rect width='19' height='5' x={col === 0 ? 4 : 26} y={row * 10 + 5} style={{fill:color}} />
);

const Ticks = ({items, onClick, max}) => {
  const getTickColor = items => _.size(items) >= max ? '#0F0' : '#F00';
  const leftItems = items[0]; //_.filter(items, item => item.minute === 0);
  const rightItems = items[1]; //_.filter(items, item => item.minute === 30);
  return <svg className="item ticks" xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox="0 0 50 50">
    <g>
      <rect width='25' height='50' x='0' y='0' style={{fillOpacity:0}} onClick={() => onClick(leftItems)} />
      <rect width='25' height='50' x='25' y='0' style={{fillOpacity:0}} onClick={() => onClick(rightItems)} />
      {_.map(leftItems, (item, i) => <Tick item={item} col={0} row={i} key={i} color={getTickColor(leftItems)} />)}
      {_.map(rightItems, (item, i) => <Tick item={item} col={1} row={i} key={i} color={getTickColor(rightItems)} />)}
    </g>
  </svg>;
};

@DropTarget(CALENDAR_ITEM, createTarget(0), (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  getClass: _.bind(getCellClass, {}, monitor),
  isDragging: () => !!monitor.getItem()
}))
class FullCell extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    day: PropTypes.number.isRequired,
    hour: PropTypes.number.isRequired,
    placeItem: PropTypes.func.isRequired,
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

  renderPopover() {
    const {popover} = this.props;
    return popover ?
    <Overlay show={this.state.showPopover} container={this} placement='right'>
      <OverlayComponent
      {...this.props}
      handleClickOutside={evt => this.setState({showPopover: false})}>
        {popover({items: this.state.popoverItems})}
      </OverlayComponent>
    </Overlay> : '';
  }

  onMouseEnter(cellItems) {
    const { fillInfoBox } = this.props;
    fillInfoBox({...this.props, cellItems});
  }

  onMouseLeave() {
    const { clearInfoBox } = this.props;
    clearInfoBox();
  }

  renderCellItem(item, i) {
    const {containerWidth, cellComponent, disabled} = this.props;
    const {minute, duration} = item;
    const startsOnHalf = minute % 60 === 30;
    //const width = duration === HALF_HOUR ? halfCssSize(containerWidth) : containerWidth;
    const marginLeft = startsOnHalf ? halfCssSize(containerWidth) : '';
    const overflow = duration === HALF_HOUR ? 'hidden' : '';
    const position = duration === HALF_HOUR ? 'absolute' : '';
    const style = {marginLeft, overflow, position, /* float: startsOnHalf === 30 ? 'left' : 'right' */};
    return cellComponent({...item, disabled, style, key: i, size: containerWidth, className: 'item'});
  }

  render() {
    const { connectDropTarget, day, hour, items, clearInfoBox, containerWidth, getClass, isDragging, coverage,
      overrideMultiplesFn, defaultGranularity } = this.props;
    const cellItems = getItemsInSlot(items, {day, hour, defaultGranularity, overrideMultiplesFn});
    const html = <div className={`cell full ${getClass(this.props)}`}
    style={{width:`${containerWidth}px`, height: `${containerWidth}px`}}
    onMouseEnter={this.onMouseEnter.bind(this, cellItems)} onMouseLeave={this.onMouseLeave.bind(this)}>
      {!_.isEmpty(cellItems) && _.isArray(cellItems[0].value) ?
        <Ticks items={cellItems} max={coverage} onClick={items => this.setState({showPopover: true, popoverItems: items})} /> :
        _.map(cellItems, this.renderCellItem.bind(this))}
      {this.renderPopover()}
    </div>;
    return isDragging ? connectDropTarget(html) : html;
  }
}

@DropTarget(CALENDAR_ITEM, createTarget(30), (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  getClass: _.bind(getCellClass, {}, monitor),
  isDragging: () => !!monitor.getItem()
}))
class HalfCell extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    side: PropTypes.string.isRequired,
    placeItem: PropTypes.func.isRequired
  };
  render () {
    const { getClass, connectDropTarget, side, isDragging } = this.props;
    const html = <div className={`cell half ${side} ${getClass(this.props)}`}></div>;
    return isDragging ? connectDropTarget(html) : html;
  }
}

const DimensionedFullCell = Dimensions()(FullCell);

export default class CalendarCell extends Component {
  static propTypes = {
    day: PropTypes.number.isRequired,
    hour: PropTypes.number.isRequired
  };

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
