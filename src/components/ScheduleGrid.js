import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReserveIcon from './ReserveIcon';
import EmployeeCalendarIcon from './EmployeeCalendarIcon';
import _ from 'lodash';
import CalendarGrid from './CalendarGrid';
import * as ScheduleActions from '../actions/ScheduleActions';
import * as InfoBoxActions from '../actions/CalendarInfoBoxActions';
import { ADMIN_SCHEDULE_CELL } from '../constants/InfoBoxTypes';
import { RESERVED, HOUR, HALF_HOUR } from '../constants/Constants';
import { overrideMultiplesFn } from '../utils/schedule';
import { getDefaultGranularity } from '../utils/calendar';
import SlotGrid from './admin/SlotGrid';
import styles from './ScheduleGrid.scss';

const getComponentClass = item => item.value === RESERVED ? ReserveIcon : EmployeeCalendarIcon;

const popover = ({items, day, hour, minute, containerWidth}) => (
  _.map(items, (item, i) => <div key={i} style={{padding: 1}}>
    <EmployeeCalendarIcon size={containerWidth - 4} value={item} day={day} hour={hour} minute={minute} />
  </div>
));

const ScheduleGrid = props => (
  <div className={styles.container}>
    {props.slotsShowing ? <div className="slots"><SlotGrid disabled={true} /></div> : <div></div>}
    <div className="schedule"><CalendarGrid {...props} /></div>
  </div>
);

ScheduleGrid.propTypes = {
  slotsShowing: PropTypes.bool
};

const mapStateToProps = state => {
  const coverage = state.schedule.location ? state.schedule.location.coverage : 1;
  return {
    items: state.schedule.shifts || {},
    coverage: coverage,
    defaultGranularity: getDefaultGranularity(coverage),
    cellComponent: item => getComponentClass(item)(item),
    slotsShowing: state.ui.slotsShowing
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const scheduleActions = bindActionCreators(ScheduleActions, dispatch);
  const infoBoxActions = bindActionCreators(InfoBoxActions, dispatch);
  return {
    placeItem: scheduleActions.placeItem,
    removeItem: scheduleActions.removeItem,
    moveItem: scheduleActions.moveItem,
    fillInfoBox: _.bind(infoBoxActions.fillInfoBox, {}, ADMIN_SCHEDULE_CELL),
    clearInfoBox: infoBoxActions.clearInfoBox
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  popover: stateProps.coverage > 1 ? popover : undefined,
  overrideMultiplesFn: overrideMultiplesFn,
  placeItem: item => dispatchProps.placeItem(item)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ScheduleGrid);
