import Timeline from './Timeline';
import TimelineModal from './TimelineModal';
import { connect } from 'react-redux';
import _ from 'lodash';
import styles from './HourPreferencesTimeline.scss';
import { HOUR_PREFERENCES } from '../constants/Constants';
import {HOUR_PREFERENCE_DESCRIPTIONS} from '../constants/Settings';

const mapStateToProps = state => ({
	type: HOUR_PREFERENCES,
	groups: [{id: 1, title: 'Hour Preferences'}],
  items: _.map(state.timeline.items, p => ({...p, group: 1, title: HOUR_PREFERENCE_DESCRIPTIONS[p.value - 1], className: 'rank' + p.value})),
	className: styles.container,
	Modal: props => <TimelineModal {...props} title='Shift preference' usePreference={true}/>
});

export default connect(
  mapStateToProps,
  {}
)(Timeline);
