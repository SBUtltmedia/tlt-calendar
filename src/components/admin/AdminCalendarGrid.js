import ReserveIcon from '../ReserveIcon';
import StudentCalendarIcon from '../StudentCalendarIcon';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import DraggableTypes from '../../constants/DraggableTypes';
import CalendarGrid from '../CalendarGrid';
import * as ScheduleActions from '../../actions/ScheduleActions';
import * as InfoBoxActions from '../../actions/CalendarInfoBoxActions';
import { ADMIN_CELL } from '../../constants/InfoBoxTypes';
import { RESERVED } from '../../constants/Constants';

function getComponentClass(item) {
  return item.value === RESERVED ? ReserveIcon : StudentCalendarIcon;
}

function getShifts(state, location) {
  const schedule = _.find(state.schedules, s => s.location === location);
  return schedule ? schedule.shifts : [];
}

const mapStateToProps = (state, ownProps) => ({
  items: getShifts(state, ownProps.location),
  itemTypes: [DraggableTypes.RESERVE, DraggableTypes.EMPLOYEE],
  cellComponent: item => getComponentClass(item)(item)
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const scheduleActions = bindActionCreators(ScheduleActions, dispatch);
  const infoBoxActions = bindActionCreators(InfoBoxActions, dispatch);
  return {
    placeItem: _.bind(scheduleActions.placeItem, {}, ownProps.location),
    removeItem: _.bind(scheduleActions.removeItem, {}, ownProps.location),
    fillInfoBox: _.bind(infoBoxActions.fillInfoBox, {}, ADMIN_CELL),
    clearInfoBox: infoBoxActions.clearInfoBox
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarGrid);
