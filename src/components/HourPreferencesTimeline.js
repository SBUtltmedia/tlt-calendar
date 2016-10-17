import Timeline from './Timeline';
import TimelineModal from './TimelineModal';
import { connect } from 'react-redux';
import _ from 'lodash';
import {addItem, removeItem} from '../actions/HourPreferencesActions';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from './HourPreferencesTimeline.scss';

const mapStateToProps = state => ({
	groups: [{id: 1, title: 'Hour Preferences'}],
  items: _.map(state.hourPreferences.preferences, p => ({...p, group: 1, title: p.value})),
	Modal: props => (
		<TimelineModal {...props} title='Shift preference'>
	    <div className={styles['modal-content']}>
				<label>PREFERENCE</label>
	      <Slider className='rank-slider' min={1} max={4} marks={{1: 'Least prefer', 4: 'Most prefer'}} />
	    </div>
  	</TimelineModal>
	)
});

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item)),
  removeItem: itemId => dispatch(removeItem(itemId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);
