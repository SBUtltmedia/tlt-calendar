import React, { PropTypes, Component } from 'react';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../constants/ItemTypes';
import * as utils from '../utils/hourPreferences';
import Chip from './Chip';
import _ from 'lodash';
import { dayMinus1, hourMinus1 } from '../utils/time';
import styles from './CalendarCell.scss';

const fullCellTarget = {
  drop(props, monitor) {
    props.placeChip(monitor.getItem().value, props.day, props.hour, 0);
  }
};

const halfCellTarget = {
  drop(props, monitor) {
    props.placeChip(monitor.getItem().value, props.day, props.hour, 30);
  }
};

function getCellClass(isOver, canDrop) {
  return isOver ? 'over ' + (canDrop ? 'accept' : 'reject') : '';
}

@DropTarget(props => [ItemTypes.CHIP], fullCellTarget, (connect, monitor) => ({
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
    placeChip: PropTypes.func.isRequired
  };
  render() {
    const { isOver, canDrop, connectDropTarget, chipsPlaced, day, hour } = this.props;
    const chips = utils.getChipsInSlot(chipsPlaced, day, hour);
    return connectDropTarget(<div className={`cell full ${getCellClass(isOver, canDrop)}`}>
      { _.map(chips, (chip, i) => <Chip {...chip} key={i} />) }
    </div>);
  }
}

@DropTarget(props => [ItemTypes.CHIP], halfCellTarget, (connect, monitor) => ({
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
    placeChip: PropTypes.func.isRequired
  };
  render () {
    const { isOver, canDrop, connectDropTarget, chipsPlaced, side } = this.props;
    return connectDropTarget(<div className={`cell half ${side} ${getCellClass(isOver, canDrop)}`}></div>);
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
