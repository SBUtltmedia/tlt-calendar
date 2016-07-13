import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as HourPreferencesActions from '../../actions/HourPreferencesActions';
import styles from './HoursSettings.scss';
import { NumberPicker } from 'react-widgets';
import numberLocalizer from 'react-widgets/lib/localizers/simple-number';
import 'react-widgets/dist/css/react-widgets.css';
numberLocalizer();

const HoursSettings = ({desiredWeeklyHours, changeDesiredWeeklyHours}) => (
  <form className={styles.container}>
    <div className="weekly-hours-container">
      <label>Weekly hours desired:</label>
      <div className="number-picker">
        <NumberPicker min={10} max={29} value={desiredWeeklyHours} onChange={changeDesiredWeeklyHours} />
      </div>
      <span className="star">*</span>
    </div>
    <div>
      Main library required hours: <span className="value">{4}</span>
    </div>
    <div className="notes">
      <p>This value determines your approximate ﬁnal hours.</p>
      <p>
        Enter as many preferences as you’d like and your
        schedule permits. The more availability you provide,
        the more changes of getting your first choice.
      </p>
    </div>
  </form>
)

const mapStateToProps = state => ({
  desiredWeeklyHours: state.hourPreferences.desiredWeeklyHours
});

const mapDispatchToProps = dispatch => {
  const actions = bindActionCreators(HourPreferencesActions, dispatch);
  return {
    changeDesiredWeeklyHours: actions.changeDesiredWeeklyHours
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HoursSettings);
