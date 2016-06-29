import ReserveIcon from './ReserveIcon';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import DraggableTypes from '../../constants/DraggableTypes';
import CalendarGrid from '../CalendarGrid';
import * as AdminActions from '../../actions/AdminActions';
import * as InfoBoxActions from '../../actions/CalendarInfoBoxActions';
import { CELL } from '../../constants/InfoBoxTypes';

const mapStateToProps = state => ({
  items: state.admin.reserves,
  itemTypes: DraggableTypes.RESERVE,
  cellComponent: ReserveIcon
});

const mapDispatchToProps = dispatch => {
  const adminActions = bindActionCreators(AdminActions, dispatch);
  const infoBoxActions = bindActionCreators(InfoBoxActions, dispatch);
  return {
    placeItem: adminActions.placeReserve,
    removeItem: adminActions.removeReserve,
    fillInfoBox: _.bind(infoBoxActions.fillInfoBox, {}, CELL)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarGrid);
