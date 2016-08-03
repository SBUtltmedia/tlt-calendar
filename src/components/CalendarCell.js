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
import { HALF_HOUR } from '../constants/Constants';
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
    popover: PropTypes.object,
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
        {popover}
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

  onClick() {
    const { popover } = this.props;
    if (popover) {
      this.setState({showPopover: true});
    }
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
    const { connectDropTarget, cellComponent, day, hour, items, clearInfoBox, disabled, containerWidth, getClass, isDragging, popover } = this.props;
    const cellItems = getItemsInSlot(items, day, hour);
    const html = <div className={`cell full ${getClass(this.props)}`}
    style={{width:`${containerWidth}px`, height: `${containerWidth}px`}}
    onClick={this.onClick.bind(this)}
    onMouseEnter={this.onMouseEnter.bind(this, cellItems)} onMouseLeave={this.onMouseLeave.bind(this)}>
      {_.map(cellItems, this.renderCellItem.bind(this))}
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
