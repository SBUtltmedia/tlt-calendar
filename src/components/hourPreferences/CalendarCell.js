import React, { PropTypes, Component } from 'react';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../../constants/ItemTypes';
import * as utils from '../../utils/hourPreferences';
import Chip from './Chip';
import _ from 'lodash';
import { dayMinus1, hourMinus1 } from '../../utils/time';
import styles from './CalendarCell.scss';

function canDrop(props, monitor) {
  return !monitor.getItem().disabled;
}

const fullCellTarget = {
  drop(props, monitor) {
    props.placeChip(monitor.getItem().value, props.day, props.hour, 0);
  },
  canDrop
};

const halfCellTarget = {
  drop(props, monitor) {
    props.placeChip(monitor.getItem().value, props.day, props.hour, 30);
  },
  canDrop
};

function getCellClass({isOver, canDrop}) {
  if (isOver) {
    if (canDrop) {
      return 'over';
    }
    else {
      return 'reject'
    }
  }
}

@DropTarget(ItemTypes.CHIP, fullCellTarget, (connect, monitor) => ({
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
    return connectDropTarget(<div className={`cell full ${getCellClass(this.props)}`}>
      { _.map(chips, (chip, i) => <Chip {...chip} key={i} />) }
    </div>);
  }
}

@DropTarget(ItemTypes.CHIP, halfCellTarget, (connect, monitor) => ({
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
