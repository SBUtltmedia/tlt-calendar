import React, { PropTypes, Component } from 'react';
import DraggableChip from './DraggableChip';
import { RANKS } from '../constants/Settings';
import _ from 'lodash';
import styles from './ChipBank.scss';
import { isValueAvailable } from '../utils/hourPreferences';

const COLUMNS = 5;

export default ({numOpenSets, chipsPlaced}) => (
  <div className={styles.container}>
    {_.map(RANKS, rank =>
      <div className="row" key={rank}>
       {_.map(_.range(COLUMNS), col =>
         <div className="chip" key={col}>
            <DraggableChip disabled={col + 1 !== numOpenSets || !isValueAvailable(chipsPlaced, rank)} value={rank} />
         </div>)}
      </div>
    )}
  </div>
);
