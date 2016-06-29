import Chip from './Chip';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import ItemTypes from '../../constants/ItemTypes';
import Calendar from '../Calendar';
import * as HourPreferencesActions from '../../actions/HourPreferencesActions';

function onItemDrop(props, monitor, minute) {
  const chip = monitor.getItem();
  if (chip.day) {
    props.removeChip(chip);
  }
  props.placeChip(chip.value, props.day, props.hour, minute, chip.duration);
}

const SutdentCalendar = () => (
	<Calendar />
);

const mapStateToProps = state => ({
  items: state.hourPreferences.chipsPlaced,
  itemType: ItemTypes.CHIP,
  cellComponent: Chip,
  onItemDrop: onItemDrop  // TODO: Refactor
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(HourPreferencesActions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);
