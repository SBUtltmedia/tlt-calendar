import { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import {getNumOpenChipSets} from '../../utils/hourPreferences';
import Chip from './Chip';
import { RANKS } from '../../constants/Settings';
import { HALF_HOUR, HOUR } from '../../constants/Constants';
import _ from 'lodash';
import styles from './ChipBank.scss';
import { isValueAvailable } from '../../utils/hourPreferences';
import { Motion, spring } from 'react-motion';
import Dimensions from 'react-dimensions';

const CONVEYOR_BELT_START_COL = 3;
const CONVEYOR_BELT_STIFFNESS = 80;
const CHIP_MARGIN = 3;
const WHOLE_COLS = 5;
const COLS = WHOLE_COLS + 0.5;  // Show half an extra column

class ChipBank extends Component {

  renderChips(duration) {
    const {chipsPlaced, numOpenSets, disabled, containerWidth} = this.props;
    const chipSize = Math.round((containerWidth - ((COLS - 1) * CHIP_MARGIN * 2)) / COLS);
    function getConveyorBeltX() {
      const col = (Math.max(0, (numOpenSets - CONVEYOR_BELT_START_COL)));
      return col * (chipSize + CHIP_MARGIN + (numOpenSets > 1 ? CHIP_MARGIN : 0));
    }
    return <div className="scroll-area">
      <Motion style={{x: spring(getConveyorBeltX(), {stiffness: CONVEYOR_BELT_STIFFNESS})}}>
        {({x}) =>
          <div style={{marginLeft: -x}}>
            {_.map(RANKS, rank =>
              <div className="bank-row" key={rank}>
               {_.map(_.range(numOpenSets + WHOLE_COLS), col =>
                 <div key={col} style={{margin: CHIP_MARGIN, width: chipSize}}>
                    <Chip size={chipSize} value={rank} duration={duration}
                    disabled={disabled || col + 1 !== numOpenSets || !isValueAvailable(chipsPlaced, rank)} />
                 </div>)}
              </div>
            )}
          </div>
        }
      </Motion>
    </div>;
  }

  render() {
    return <div className={styles.container}>
      <Tabs defaultActiveKey={1} id="chip-bank-tabs">
        <Tab eventKey={1} title="Hour">{this.renderChips(HOUR)}</Tab>
        <Tab eventKey={2} title="Half hour">{this.renderChips(HALF_HOUR)}</Tab>
      </Tabs>

      <p className="notes">
        Drag and drop on schedule to indicate preferences
      </p>
    </div>
  }
}

const mapStateToProps = state => {
  const {chipsPlaced} = state.hourPreferences;
  return {
    chipsPlaced: chipsPlaced,
    numOpenSets: getNumOpenChipSets(chipsPlaced)
  };
};

export default connect(
  mapStateToProps,
  {}
)(Dimensions()(ChipBank));
