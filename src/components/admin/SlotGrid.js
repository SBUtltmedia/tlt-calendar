import Slot from './Slot';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import CalendarGrid from '../CalendarGrid';
import * as SlotsActions from '../../actions/SlotsActions';
import * as InfoBoxActions from '../../actions/CalendarInfoBoxActions';
import { STUDENT_CELL } from '../../constants/InfoBoxTypes';

const mapStateToProps = state => ({
  items: state.slot.chipsPlaced,
  cellComponent: Slot
});

const mapDispatchToProps = dispatch => {
  const slotActions = bindActionCreators(HourPreferencesActions, dispatch);
  const infoBoxActions = bindActionCreators(InfoBoxActions, dispatch);
  return {
    placeItem: slotsActions.placeItem,
    removeItem: slotsActions.removeItem,
    fillInfoBox: _.bind(infoBoxActions.fillInfoBox, {}, STUDENT_CELL),
    clearInfoBox: infoBoxActions.clearInfoBox
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarGrid);
