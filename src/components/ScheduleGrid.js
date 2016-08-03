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

const Ticks = ({key}) => (
  <svg key={key} xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox="0 0 50 50">
    <g>
      <rect width='19' height='5' x="5" y="5" style={{fill:"#0F0"}} />
      <rect width='19' height='5' x="5" y="15" style={{fill:"#0F0"}} />
      <rect width='19' height='5' x="5" y="25" style={{fill:"#0F0"}} />
      <rect width='19' height='5' x="5" y="35" style={{fill:"#0F0"}} />
      <rect width='19' height='5' x="26" y="5" style={{fill:"#0F0"}} />
      <rect width='19' height='5' x="26" y="15" style={{fill:"#0F0"}} />
      <rect width='19' height='5' x="26" y="25" style={{fill:"#0F0"}} />
      <rect width='19' height='5' x="26" y="35" style={{fill:"#0F0"}} />
    </g>
  </svg>
);

function getComponentClass(item) {
  return item.value === RESERVED ? ReserveIcon : EmployeeCalendarIcon;
}

const popover = <div>
  Booo
</div>;

const mapStateToProps = state => {
  const coverage = state.locations && state.schedule.location ? _.find(state.locations, loc => loc.id === state.schedule.location).coverage : 1;
  return {
    items: state.schedule.shifts || {},
    coverage: coverage,
    cellComponent: coverage > 1 ? Ticks : item => getComponentClass(item)(item)
  };
};

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
