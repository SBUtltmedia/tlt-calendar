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

function onFullCellDrop(props, monitor) {
	props.placeChip(monitor.getItem().value, props.day, props.hour, 0);
}

function onHalfCellDrop(props, monitor) {
	props.placeChip(monitor.getItem().value, props.day, props.hour, 30);
}

const SutdentCalendar = ({chipsPlaced}) => (
	<VisibleCalendar itemType={ItemTypes.CHIP} renderCellContents={_.bind(renderCellContents, {}, chipsPlaced)}
		onFullCellDrop={onFullCellDrop} onHalfCellDrop={onHalfCellDrop} />
);

const mapStateToProps = state => {
  return state.hourPreferences;
};

export default connect(
  mapStateToProps,
  {}
)(SutdentCalendar);
