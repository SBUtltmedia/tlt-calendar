import { PropTypes } from 'react'
import _ from 'lodash'
import styles from './HourPreferencesGrid.scss'
import HourPreferencesGridCell from './HourPreferencesGridCell'
import { getHourLabel, timeToIndex } from '../utils/time'
import { SHORT_DAYS } from '../constants/Settings'
import ReactTooltip from 'react-tooltip'

const Hints = ({numFilledIn, children}) => (
  numFilledIn === 0 ?
    <ReactTooltip place="top" type="light" effect="float">
      {children}
    </ReactTooltip> : {children}
)

const HourPreferencesGrid = ({items, numFilledIn}) => (
  <div className={styles.container}>
    <Hints numFilledIn={numFilledIn}>
      <table className='calendar'>
        <thead>
          <tr>
            { _.map(_.range(26), i => (
              <td key={i} colSpan='2'>
                <div className='hour-label'>
                  {i === 0 ? '' : getHourLabel(i - 1)}
                </div>
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          { _.map(SHORT_DAYS, (day, i) => (
            <tr key={i}>
              <td className='day-label' colSpan='2'>{day}</td>
              { _.map(_.range(48), col => (
                <td key={col}>
                  <HourPreferencesGridCell
                    items={items}
                    index={timeToIndex({
                      day: i,
                      hour: Math.floor(col / 2),
                      minute: col % 2 === 0 ? 0 : 30
                    })}
                  />
                </td>
              )) }
              <td className='day-label' colSpan='2'>
                {day}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Hints>
  </div>
)

HourPreferencesGrid.propTypes = {
  items: PropTypes.arrayOf(PropTypes.number).isRequired,
  numFilledIn: _.sumBy(items, x => x > 0)
}

export default HourPreferencesGrid
