import React, { PropTypes, Component } from 'react';
import DraggableChip from './DraggableChip';
import { RANKS } from '../constants/Settings';
import _ from 'lodash';
import styles from './ChipBank.scss';

const COLUMNS = 5;

export default () => (
  <div className={styles.container}>
    {_.map(RANKS, rank =>
      <div className="row" key={rank}>
       { _.map(_.range(COLUMNS), i => <div className="chip" key={i}><DraggableChip value={rank} /></div>) }
      </div>
    )}
  </div>
);
