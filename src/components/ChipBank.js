import React, { PropTypes, Component } from 'react';
import DraggableChip from './DraggableChip';
import { RANKS } from '../constants/Settings';
import _ from 'lodash';
import './ChipBank.scss';

export default () => (
  <div className="container">
    {_.map(RANKS, rank => <div className="chip-container" key={rank}><DraggableChip value={rank} /></div>)}
  </div>
);
