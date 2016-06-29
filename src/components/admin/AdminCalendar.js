import ReserveIcon from './ReserveIcon';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import ItemTypes from '../../constants/ItemTypes';
import Calendar from '../Calendar';
import * as AdminActions from '../../actions/AdminActions';

function onItemDrop(props, monitor, minute) {
  const reserve = monitor.getItem();
  if (reserve.day) {
    props.removeReserve(reserve);
  }
  props.placeReserve(props.day, props.hour, minute, reserve.duration);
}

const AdminCalendar = () => (
  <VisibleCalendar />
);

const mapStateToProps = state => ({
  items: state.admin.reserves,
  itemType: ItemTypes.RESERVE,
  cellComponent: ReserveIcon,
  onItemDrop: onItemDrop  // TODO: Refactor
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(AdminActions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminCalendar);
