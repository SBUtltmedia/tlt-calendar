import React, { PropTypes, Component } from 'react';
import DraggableChip from './DraggableChip';
import { getSize as getChipSize } from './Chip';
import { RANKS } from '../constants/Settings';
import _ from 'lodash';
import styles from './ChipBank.scss';
import { isValueAvailable } from '../utils/hourPreferences';
import { Motion, spring } from 'react-motion';

var chipWidth;
getChipSize(({width}) => chipWidth = width);

const CONVEYOR_BELT_START_COL = 3;
const CHIP_MARGIN = 3;

function getConveyorBeltX(currentSetNumber) {
  return (chipWidth + CHIP_MARGIN + (currentSetNumber > 1 ? CHIP_MARGIN : 0)) *
         (Math.max(0, (currentSetNumber - CONVEYOR_BELT_START_COL)))
}

export default ({chipsPlaced, numOpenSets}) => (
  <div className={styles.scrollArea}>
    <Motion style={{x: chipWidth ? spring(getConveyorBeltX(numOpenSets)) : 0}}>
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
);
