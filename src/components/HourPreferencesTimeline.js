import Timeline from './Timeline';
import TimelineModal from './TimelineModal';
import { connect } from 'react-redux';
import _ from 'lodash';
import {addItem, removeItem} from '../actions/HourPreferencesActions';

const mapStateToProps = state => ({
	groups: [{id: 1, title: 'Hour Preferences'}],
  items: _.map(state.hourPreferences.preferences, p => ({...p, group: 1, title: p.value})),
	Modal: props => <TimelineModal {...props} title='Shift preference' usePreference={true} />
});

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item)),
  removeItem: itemId => dispatch(removeItem(itemId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);
