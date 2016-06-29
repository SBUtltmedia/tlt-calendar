import React, { PropTypes, Component } from 'react';
import { DropTarget } from 'react-dnd';
import _ from 'lodash';
import { dayMinus1, hourMinus1 } from '../utils/time';
import styles from './CalendarCell.scss';

function createTarget(minute) {
  return {
    drop(props, monitor) {
      props.onDrop(props, monitor, minute);
    },
    canDrop(props, monitor) {
      return !monitor.getItem().disabled;
    }
  };
}

function getCellClass({isOver, canDrop}) {
  if (isOver) {
    if (canDrop) {
      return 'over';
    }
    else {
      return 'reject'
    }
  }
  return '';
}

@DropTarget(props => props.itemType, createTarget(0), (connect, monitor) => ({
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
    placeChip: PropTypes.func.isRequired,
    renderCellContents: PropTypes.func.isRequired,
    itemType: PropTypes.string.isRequired,
    onDrop: PropTypes.func.isRequired
  };
  render() {
    const { connectDropTarget, renderCellContents, day, hour } = this.props;
    return connectDropTarget(<div className={`cell full ${getCellClass(this.props)}`}>{renderCellContents(day, hour)}</div>);
  }
}

@DropTarget(props => props.itemType, createTarget(30), (connect, monitor) => ({
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
    placeChip: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired
  };
  render () {
    const { isOver, canDrop, connectDropTarget, chipsPlaced, side } = this.props;
    return connectDropTarget(<div className={`cell half ${side} ${getCellClass(this.props)}`}></div>);
  }
}

export default class CalendarCell extends Component {
  static propTypes = {
    chipsPlaced: PropTypes.array.isRequired,
    day: PropTypes.number.isRequired,
    hour: PropTypes.number.isRequired,
    placeChip: PropTypes.func.isRequired
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
