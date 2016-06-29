import Chip from './Chip';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import DraggableTypes from '../../constants/DraggableTypes';
import CalendarGrid from '../CalendarGrid';
import * as HourPreferencesActions from '../../actions/HourPreferencesActions';
import * as InfoBoxActions from '../../actions/CalendarInfoBoxActions';
import { CELL } from '../../constants/InfoBoxTypes';

const mapStateToProps = state => ({
  items: state.hourPreferences.chipsPlaced,
  itemTypes: DraggableTypes.CHIP,
  cellComponent: Chip
});

const mapDispatchToProps = dispatch => {
  const HourPreferencesActions = bindActionCreators(HourPreferencesActions, dispatch);
  const infoBoxActions = bindActionCreators(InfoBoxActions, dispatch);
  return {
    placeItem: HourPreferencesActions.placeChip,
    removeItem: HourPreferencesActions.removeChip,
    fillInfoBox: _.bind(infoBoxActions.fillInfoBox, {}, CELL)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarGrid);
