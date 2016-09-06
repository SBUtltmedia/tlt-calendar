import Chip from './Chip';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import CalendarGrid from '../CalendarGrid';
import * as HourPreferencesActions from '../../actions/HourPreferencesActions';
import * as InfoBoxActions from '../../actions/CalendarInfoBoxActions';
import { STUDENT_CELL } from '../../constants/InfoBoxTypes';

const mapStateToProps = state => ({
  items: state.hourPreferences.chipsPlaced,
  cellComponent: Chip
});

const mapDispatchToProps = dispatch => {
  const hourPreferencesActions = bindActionCreators(HourPreferencesActions, dispatch);
  const infoBoxActions = bindActionCreators(InfoBoxActions, dispatch);
  return {
    placeItem: hourPreferencesActions.placeItem,
    removeItem: hourPreferencesActions.removeItem,
    moveItem: hourPreferencesActions.moveItem,
    fillInfoBox: _.bind(infoBoxActions.fillInfoBox, {}, STUDENT_CELL),
    clearInfoBox: infoBoxActions.clearInfoBox
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarGrid);