import { PropTypes, Component } from 'react';
import { DropTarget } from 'react-dnd';
import _ from 'lodash';
import { getItemsInSlot } from '../utils/calendar';
import { dayMinus1, hourMinus1 } from '../utils/time';
import styles from './CalendarCell.scss';

function createTarget(minute) {
  return {
    drop(props, monitor) {
      const item = monitor.getItem();
      if (item.day) {  // If it's already placed somewhere on the calendar grid
        props.removeItem(item);
      }
      props.placeItem(_.assign({}, item, props, {minute}));
    },
    canDrop(props, monitor) {
      return !monitor.getItem().disabled;
    }
  };
}

function getCellClass({isOver, canDrop}) {
  if (isOver && canDrop) { return 'over'; }
  if (isOver && !canDrop) { return 'reject'; }
  return '';
}

@DropTarget(props => props.itemTypes, createTarget(0), (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
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
    itemTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    items: PropTypes.array.isRequired
  };

  fillInfoBox(cellItems) {
    this.props.fillInfoBox({...this.props, cellItems});
  }

  render() {
    const { connectDropTarget, cellComponent, day, hour, items, clearInfoBox } = this.props;
    const cellItems = getItemsInSlot(items, day, hour);
    return connectDropTarget(
      <div className={`cell full ${getCellClass(this.props)}`}
      onMouseEnter={this.fillInfoBox.bind(this, cellItems)} onMouseLeave={clearInfoBox}>
        {_.map(cellItems, (item, i) => cellComponent({...item, key: i, size: '100%'}))}
      </div>
    );
  }
}

@DropTarget(props => props.itemTypes, createTarget(30), (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
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
    const { isOver, canDrop, connectDropTarget, side } = this.props;
    return connectDropTarget(<div className={`cell half ${side} ${getCellClass(this.props)}`}></div>);
  }
}

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
        : '' }
      <FullCell {...this.props} />
      <HalfCell side="right" {...this.props} />
    </div>;
  }
}
