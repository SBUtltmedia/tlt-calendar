import React, { PropTypes, Component } from 'react';
import DraggableChip from './DraggableChip';
import { getSize as getChipSize } from './Chip';
import { RANKS } from '../../constants/Settings';
import _ from 'lodash';
import styles from './ChipBank.scss';
import { isValueAvailable } from '../../utils/hourPreferences';
import { Motion, spring } from 'react-motion';

const CONVEYOR_BELT_START_COL = 3;
const CONVEYOR_BELT_STIFFNESS = 80;
const CHIP_MARGIN = 3;

var chipWidth;
getChipSize(({width}) => chipWidth = width);

function getConveyorBeltX(currentSetNumber) {
  if (chipWidth) {
    const col = (Math.max(0, (currentSetNumber - CONVEYOR_BELT_START_COL)));
    return col * (chipWidth + CHIP_MARGIN + (currentSetNumber > 1 ? CHIP_MARGIN : 0));
  }
  else {  // chipWidth has not loaded yet
    return 0;
  }
}

export default ({chipsPlaced, numOpenSets}) => (
  <div className={styles.container}>
    <div className="scroll-area">
      <Motion style={{x: spring(getConveyorBeltX(numOpenSets), {stiffness: CONVEYOR_BELT_STIFFNESS})}}>
        {({x}) =>
          <div className="bank" style={{marginLeft: -x}}>
            {_.map(RANKS, rank =>
              <div className="row" key={rank}>
               {_.map(_.range(numOpenSets + 5), col =>
                 <div key={col} style={{margin: CHIP_MARGIN}}>
                    <DraggableChip disabled={col + 1 !== numOpenSets || !isValueAvailable(chipsPlaced, rank)} value={rank} />
                 </div>)}
              </div>
            )}
          </div>
        }
      </Motion>
    </div>
    <p className="notes">
      Drag and drop on schedule to indicate preferences
    </p>
  </div>
);
