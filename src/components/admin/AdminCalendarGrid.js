import ReserveIcon from '../ReserveIcon';
import StudentCalendarIcon from '../StudentCalendarIcon';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import DraggableTypes from '../../constants/DraggableTypes';
import CalendarGrid from '../CalendarGrid';
import * as AdminActions from '../../actions/AdminActions';
import * as InfoBoxActions from '../../actions/CalendarInfoBoxActions';
import { ADMIN_CELL } from '../../constants/InfoBoxTypes';
import { RESERVED } from '../../constants/Constants';

function getComponentClass(item) {
  return item.value === RESERVED ? ReserveIcon : StudentCalendarIcon;
}

const mapStateToProps = state => ({
  items: state.admin.calendarItems,
  itemTypes: [DraggableTypes.RESERVE, DraggableTypes.EMPLOYEE],
  cellComponent: item => getComponentClass(item)(item)
});

const mapDispatchToProps = dispatch => {
  const adminActions = bindActionCreators(AdminActions, dispatch);
  const infoBoxActions = bindActionCreators(InfoBoxActions, dispatch);
  return {
    placeItem: adminActions.placeItem,
    removeItem: adminActions.removeItem,
    fillInfoBox: _.bind(infoBoxActions.fillInfoBox, {}, ADMIN_CELL),
    clearInfoBox: infoBoxActions.clearInfoBox
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarGrid);
