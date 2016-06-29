import ReserveIcon from './ReserveIcon';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import DraggableTypes from '../../constants/DraggableTypes';
import CalendarGrid from '../CalendarGrid';
import * as AdminActions from '../../actions/AdminActions';

const mapStateToProps = state => ({
  items: state.admin.reserves,
  itemTypes: DraggableTypes.RESERVE,
  cellComponent: ReserveIcon
});

const mapDispatchToProps = dispatch => {
  const actions = bindActionCreators(AdminActions, dispatch);
  return {
    placeItem: actions.placeReserve,
    removeItem: actions.removeReserve
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarGrid);
