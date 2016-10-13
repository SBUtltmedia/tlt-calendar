import Timeline from './Timeline';
import TimelineModal from './TimelineModal';
import { connect } from 'react-redux';
import _ from 'lodash';
import {addItem, removeItem} from '../actions/ScheduleActions';

const mapStateToProps = state => ({
	groups: state.locations,
  items: _.map(state.schedule.shifts, item => ({...item, title: item.value.firstName + ' ' + item.value.lastName})),
	Modal: props => (<TimelineModal {...props} title='Schedule Item' useLocation={true} useEmployee={true} />)
});

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item)),
  removeItem: itemId => dispatch(removeItem(itemId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);
