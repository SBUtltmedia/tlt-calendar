import Chip from './Chip';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import ItemTypes from '../../constants/ItemTypes';
import CalendarGrid from '../CalendarGrid';
import * as HourPreferencesActions from '../../actions/HourPreferencesActions';

const mapStateToProps = state => ({
  items: state.hourPreferences.chipsPlaced,
  itemType: ItemTypes.CHIP,
  cellComponent: Chip
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
