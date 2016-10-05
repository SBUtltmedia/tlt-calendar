import Timeline from './Timeline';
import { connect } from 'react-redux';
import _ from 'lodash';
import SlotsModal from './SlotsModal';

const mapStateToProps = state => ({
	groups: state.locations,
  items: [],
	Modal: SlotsModal
});

const mapDispatchToProps = (dispatch, ownProps) => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);
