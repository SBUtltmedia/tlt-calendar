import Timeline from './Timeline';
import { connect } from 'react-redux';
import _ from 'lodash';
import TimelineModal from './TimelineModal';
import {addItem, removeItem} from '../actions/SlotsActions';

const mapStateToProps = state => ({
	groups: state.locations,
  items: [],
	Modal: props => (<TimelineModal {...props} title='Slot' />)
});

const mapDispatchToProps = (dispatch, ownProps) => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);
