import React, { PropTypes, Component } from 'react';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../constants/ItemTypes';
import * as utils from '../utils/hourPreferences';
import Chip from './Chip';

const dustbinTarget = {
  drop(props, monitor) {
    props.placeChip(monitor.getItem().value, props.day, props.hour);
  }
};

@DropTarget(props => [ItemTypes.CHIP], dustbinTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
export default class CalendarCell extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    chipsPlaced: PropTypes.array.isRequired,
    day: PropTypes.number.isRequired,
    hour: PropTypes.number.isRequired,
    placeChip: PropTypes.func.isRequired
  };

  render() {
    const { accepts, isOver, canDrop, connectDropTarget, chipsPlaced, day, hour } = this.props;
    const chip = utils.getChipInSlot(chipsPlaced, day, hour);
    return connectDropTarget(<td>
      { chip ? <Chip value={chip.value} /> : '' }
    </td>);
  }
}
