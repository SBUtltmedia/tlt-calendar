import Timeline from './Timeline';
import { connect } from 'react-redux';
import TimelineModal from './TimelineModal';
import { SLOTS } from '../constants/Constants';

const mapStateToProps = state => ({
	type: SLOTS,
	groups: state.locations,
  items: [],
	Modal: props => (<TimelineModal {...props} title='Slot' />)
});

export default connect(
  mapStateToProps,
  {}
)(Timeline);
