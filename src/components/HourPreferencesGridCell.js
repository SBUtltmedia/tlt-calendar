import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {onCellClick} from '../actions/HourPreferencesActions'
import {getCellValue} from '../utils/hourPreferences'
import styles from './HourPreferencesGridCell.scss'

const HourPreferencesGridCell = ({index, rank, onCellClick}) => (
  <div className={styles.container + (rank ? ` rank${rank}` : '')}
       onClick={onCellClick}
  />
)

const mapStateToProps = (state, ownProps) => ({
  rank: getCellValue(state.hourPreferences.preferences, ownProps.index)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onCellClick: () => dispatch(onCellClick(ownProps.index))
})

HourPreferencesGridCell.propTypes = {
  index: PropTypes.number.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HourPreferencesGridCell)
