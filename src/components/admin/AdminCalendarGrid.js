import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReserveIcon from '../ReserveIcon';
import EmployeeCalendarIcon from '../EmployeeCalendarIcon';
import _ from 'lodash';
import CalendarGrid from '../CalendarGrid';
import * as ScheduleActions from '../../actions/ScheduleActions';
import * as InfoBoxActions from '../../actions/CalendarInfoBoxActions';
import { ADMIN_CELL } from '../../constants/InfoBoxTypes';
import { RESERVED } from '../../constants/Constants';

function getComponentClass(item) {
  return item.value === RESERVED ? ReserveIcon : EmployeeCalendarIcon;
}

const mapStateToProps = state => ({
  items: state.schedule.shifts || [],
  cellComponent: item => getComponentClass(item)(item)
});

const mapDispatchToProps = dispatch => {
  const scheduleActions = bindActionCreators(ScheduleActions, dispatch);
  const infoBoxActions = bindActionCreators(InfoBoxActions, dispatch);
  return {
    placeItem: scheduleActions.placeItem,
    removeItem:scheduleActions.removeItem,
    fillInfoBox: _.bind(infoBoxActions.fillInfoBox, {}, ADMIN_CELL),
    clearInfoBox: infoBoxActions.clearInfoBox
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarGrid);
