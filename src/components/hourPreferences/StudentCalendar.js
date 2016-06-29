import DraggableChip from './DraggableChip';
import { connect } from 'react-redux';
import _ from 'lodash';
import ItemTypes from '../../constants/ItemTypes';
import * as utils from '../../utils/hourPreferences';
import VisibleCalendar from '../VisibleCalendar';

function renderCellContents(chipsPlaced, day, hour) {
	const chips = utils.getChipsInSlot(chipsPlaced, day, hour);
	return _.map(chips, (chip, i) => <DraggableChip {...chip} key={i} />);
}

function onDrop(props, monitor, minute) {
  const chip = monitor.getItem();
  if (chip.day) {
    props.removeChip(chip);
  }
  props.placeChip(chip.value, props.day, props.hour, minute);
}

const SutdentCalendar = ({chipsPlaced}) => (
	<VisibleCalendar itemType={ItemTypes.CHIP}
	renderCellContents={_.bind(renderCellContents, {}, chipsPlaced)} onDrop={onDrop} />
);

const mapStateToProps = state => {
  return state.hourPreferences;
};

export default connect(
  mapStateToProps,
  {}
)(SutdentCalendar);
