import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Trash from '../Trash';
import DraggableTypes from '../../constants/DraggableTypes';
import * as AdminActions from '../../actions/AdminActions';

const mapStateToProps = state => ({
  items: state.admin.calendarItems,
  itemTypes: DraggableTypes.RESERVE
});

const mapDispatchToProps = dispatch => {
  const actions = bindActionCreators(AdminActions, dispatch);
  return {
    placeItem: actions.placeReserve,
    removeItem: actions.removeItem
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trash);
