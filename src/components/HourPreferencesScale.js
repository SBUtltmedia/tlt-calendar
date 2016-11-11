import { connect } from 'react-redux';
import { getAverageCellValue } from '../utils/hourPreferences';
import styles from './HourPreferencesScale.scss';
import { NUM_RANKS } from '../constants/Settings';

function getIndicatorLeftPercentage(value) {
  return value ? ((value - 0.5) / NUM_RANKS) * 100 : 50;
}

const HourPreferencesScale = ({value}) => (
  <div className={styles.container}>
    <div className="indicator" style={{left: getIndicatorLeftPercentage(value) + '%' }} />
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  value: getAverageCellValue(state.hourPreferences.preferences, ownProps)
});

export default connect(
  mapStateToProps,
  {}
)(HourPreferencesScale);
