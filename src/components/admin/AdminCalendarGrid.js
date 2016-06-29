import ReserveIcon from './ReserveIcon';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import ItemTypes from '../../constants/ItemTypes';
import CalendarGrid from '../CalendarGrid';
import * as AdminActions from '../../actions/AdminActions';

function onItemDrop(props, monitor, minute) {
  const reserve = monitor.getItem();
  if (reserve.day) {
    props.removeItem(reserve);
  }
  props.placeItem(props.day, props.hour, minute, reserve.duration);
}

const mapStateToProps = state => ({
  items: state.admin.reserves,
  itemType: ItemTypes.RESERVE,
  cellComponent: ReserveIcon,
  onItemDrop: onItemDrop  // TODO: Refactor
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
