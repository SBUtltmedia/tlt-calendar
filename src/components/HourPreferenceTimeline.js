import Timeline from './Timeline';
import { connect } from 'react-redux';
import _ from 'lodash';

const mapStateToProps = state => ({
	groups: [{id: 1, title: 'Hour Preferences'}],
  items: _.map(state.hourPreferences.chipsPlaced, chip => ({...chip, group: 1}))
});

const mapDispatchToProps = (dispatch, ownProps) => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);
