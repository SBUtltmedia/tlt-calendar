import Timeline from './Timeline';
import { connect } from 'react-redux';
import _ from 'lodash';


import moment from 'moment';

const mapStateToProps = state => ({
	groups: state.locations,
  items: [
		{id: 1, group: 1, title: 'item 1', start_time: moment(), end_time: moment().add(1, 'hour')},
	  {id: 2, group: 2, title: 'item 2', start_time: moment().add(-0.5, 'hour'), end_time: moment().add(0.5, 'hour')},
	  {id: 3, group: 1, title: 'item 3', start_time: moment().add(2, 'hour'), end_time: moment().add(3, 'hour')}
	]
});

const mapDispatchToProps = (dispatch, ownProps) => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);
