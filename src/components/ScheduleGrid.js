import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReserveIcon from './ReserveIcon';
import EmployeeCalendarIcon from './EmployeeCalendarIcon';
import _ from 'lodash';
import CalendarGrid from './CalendarGrid';
import * as ScheduleActions from '../actions/ScheduleActions';
import * as InfoBoxActions from '../actions/CalendarInfoBoxActions';
import { ADMIN_SCHEDULE_CELL } from '../constants/InfoBoxTypes';
import { RESERVED } from '../constants/Constants';

function getComponentClass(item) {
  return item.value === RESERVED ? ReserveIcon : EmployeeCalendarIcon;
}

const popover = <div>
  Booo
</div>;

const mapStateToProps = state => ({
  items: state.schedule.shifts || {},
  coverage: state.locations && state.schedule.location ? _.find(state.locations, loc => loc.id === state.schedule.location).coverage : 1,
  cellComponent: item => getComponentClass(item)(item),
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const scheduleActions = bindActionCreators(ScheduleActions, dispatch);
  const infoBoxActions = bindActionCreators(InfoBoxActions, dispatch);
  return {
    placeItem: scheduleActions.placeItem,
    removeItem:scheduleActions.removeItem,
    fillInfoBox: _.bind(infoBoxActions.fillInfoBox, {}, ADMIN_SCHEDULE_CELL),
    clearInfoBox: infoBoxActions.clearInfoBox
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {coverage} = stateProps;
  return {
    popover: coverage > 1 ? popover : undefined,
    ...stateProps,
    ...dispatchProps,
    ...ownProps
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(CalendarGrid);
