import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LocationOrder from './LocationOrder';
import * as HourPreferencesActions from '../../actions/HourPreferencesActions';
import * as InfoBoxActions from '../../actions/CalendarInfoBoxActions';
import _ from 'lodash';
import { ACTION } from '../../constants/InfoBoxTypes';

const mapStateToProps = state => {
  return state.hourPreferences;
};

const mapDispatchToProps = dispatch => {
  const hourPreferencesActions = bindActionCreators(HourPreferencesActions, dispatch);
  const infoBoxActions = bindActionCreators(InfoBoxActions, dispatch);
  return {
    reorderGlobalLocations: hourPreferencesActions.reorderGlobalLocations,
    fillInfoBox: _.bind(infoBoxActions.fillInfoBox, {}, ACTION),
    clearInfoBox: infoBoxActions.clearInfoBox
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationOrder);
