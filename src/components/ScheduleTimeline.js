import Timeline from './Timeline';
import { connect } from 'react-redux';
import _ from 'lodash';

const mapStateToProps = state => ({
	groups: state.locations,
  items: []
});

const mapDispatchToProps = (dispatch, ownProps) => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);
