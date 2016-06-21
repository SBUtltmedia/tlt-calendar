import React, { PropTypes, Component } from 'react';
import DraggableChip from './DraggableChip';
import { RANKS } from '../constants/Settings';
import _ from 'lodash';
import styles from './ChipBank.scss';

export default () => (
  <div className={styles.container}>
    {_.map(RANKS, rank => <div className="chip" key={rank}><DraggableChip value={rank} /></div>)}
  </div>
);
