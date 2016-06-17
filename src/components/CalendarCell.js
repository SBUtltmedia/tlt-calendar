import React, { PropTypes, Component } from 'react';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../constants/ItemTypes';
import * as utils from '../utils/hourPreferences';
import Chip from './Chip';
import _ from 'lodash';
import { dayMinus1, hourMinus1 } from '../utils/time';
import './CalendarCell.scss';

function getCellStyle(isOver) {
  const backgroundColor = isOver ? 'blue' : null;
  const opacity = isOver ? 0.4 : 1;
  return {backgroundColor, opacity};
}

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
    const chip = utils.getChipInSlot(chipsPlaced, day, hour);
    return connectDropTarget(<div style={getCellStyle(isOver)}className="full-cell">
      { chip ? <Chip {...chip} /> : '' }
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
    return connectDropTarget(<div style={getCellStyle(isOver)} className={`half-cell ${side}`}></div>);
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
    return <div className="container">
      { hour === 0 ?
        <HalfCell side="left" {..._.assign({}, this.props, {day: dayMinus1(day), hour: hourMinus1(hour)})} />
        : '' }
      <FullCell {...this.props} />
      <HalfCell side="right" {...this.props} />
    </div>;
  }
}
