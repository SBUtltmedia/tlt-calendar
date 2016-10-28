import Timeline from './Timeline';
import { connect } from 'react-redux';
import TimelineModal from './TimelineModal';
import { SLOTS } from '../constants/Constants';

const mapStateToProps = state => ({
	type: SLOTS,
	groups: state.locations,
  items: _.map(state.timeline.items, item => ({...item, title: ''})),
	Modal: props => (<TimelineModal {...props} useLocation={true} title='Slot' />)
});

export default connect(
  mapStateToProps,
  {}
)(Timeline);
