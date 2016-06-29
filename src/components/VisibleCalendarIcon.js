import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CalendarIcon from './CalendarIcon';
import * as InfoBoxActions from '../actions/CalendarInfoBoxActions';
import { ACTION } from '../constants/InfoBoxTypes';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => {
  const infoBoxActions = bindActionCreators(InfoBoxActions, dispatch);
  return {
    fillInfoBox: _.bind(infoBoxActions.fillInfoBox, {}, ACTION),
    clearInfoBox: infoBoxActions.clearInfoBox
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarIcon);
