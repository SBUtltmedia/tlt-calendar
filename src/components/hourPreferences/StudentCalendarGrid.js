import Chip from './Chip';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import ItemTypes from '../../constants/ItemTypes';
import CalendarGrid from '../CalendarGrid';
import * as HourPreferencesActions from '../../actions/HourPreferencesActions';

function onItemDrop(props, monitor, minute) {
  const chip = monitor.getItem();
  if (chip.day) {
    props.removeItem(chip);
  }
  props.placeItem(chip.value, props.day, props.hour, minute, chip.duration);
}

const mapStateToProps = state => ({
  items: state.hourPreferences.chipsPlaced,
  itemType: ItemTypes.CHIP,
  cellComponent: Chip,
  onItemDrop: onItemDrop  // TODO: Refactor
});

const mapDispatchToProps = dispatch => {
  const actions = bindActionCreators(HourPreferencesActions, dispatch);
  return {
    placeItem: actions.placeChip,
    removeItem: actions.removeChip
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarGrid);
