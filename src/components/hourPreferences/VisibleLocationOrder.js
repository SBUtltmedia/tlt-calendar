import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LocationOrder from './LocationOrder';
import * as HourPreferencesActions from '../../actions/HourPreferencesActions';

const mapStateToProps = state => {
  return state.hourPreferences;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(HourPreferencesActions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationOrder);
