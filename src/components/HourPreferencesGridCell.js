import { connect } from 'react-redux';
import { onCellClick } from '../actions/HourPreferencesActions';
import { getCellValue } from '../utils/hourPreferences';
import styles from './HourPreferencesGridCell.scss';

const HourPreferencesGridCell = ({index, rank, onCellClick}) => (
  <div className={styles.container + (rank ? ` rank${rank}` : '')}
       onClick={onCellClick}
  />
);

const mapStateToProps = (state, ownProps) => ({
  rank: getCellValue(state.hourPreferences.preferences, ownProps.index)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onCellClick: () => dispatch(onCellClick(ownProps.index))
});

/*
HourPreferencesGridCell.propTypes = {
  fillInfoBox: PropTypes.func.isRequired,
  clearInfoBox: PropTypes.func.isRequired,
  cellComponent: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
};
*/

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HourPreferencesGridCell);
