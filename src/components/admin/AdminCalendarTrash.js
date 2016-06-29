import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Trash from '../Trash';
import ItemTypes from '../../constants/ItemTypes';
import * as AdminActions from '../../actions/AdminActions';

const mapStateToProps = state => ({
  items: state.admin.reserves,
  itemTypes: ItemTypes.RESERVE
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
)(Trash);
