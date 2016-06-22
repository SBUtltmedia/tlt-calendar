import React, { PropTypes, Component } from 'react';
import DraggableChip from './DraggableChip';
import { RANKS } from '../constants/Settings';
import _ from 'lodash';
import styles from './ChipBank.scss';
import { isValueAvailable } from '../utils/hourPreferences';
import {Motion, spring} from 'react-motion';

const CHIP_WIDTH = 58;  // TODO: Make dynamic
const CONVEYOR_BELT_START_COL = 3;

export default ({chipsPlaced, numOpenSets}) => (
  <div className={styles.scrollArea}>
    <Motion style={{x: spring(CHIP_WIDTH * (Math.max(0, (numOpenSets - CONVEYOR_BELT_START_COL))))}}>
      {({x}) =>
        <div className="bank" style={{marginLeft: -x}}>
          {_.map(RANKS, rank =>
            <div className="row" key={rank}>
             {_.map(_.range(numOpenSets + 5), col =>
               <div className="chip" key={col}>
                  <DraggableChip disabled={col + 1 !== numOpenSets || !isValueAvailable(chipsPlaced, rank)} value={rank} />
               </div>)}
            </div>
          )}
        </div>
      }
    </Motion>
  </div>
);
