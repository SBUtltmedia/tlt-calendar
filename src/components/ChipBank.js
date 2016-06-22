import React, { PropTypes, Component } from 'react';
import DraggableChip from './DraggableChip';
import { RANKS } from '../constants/Settings';
import _ from 'lodash';
import styles from './ChipBank.scss';
import { isValueAvailable } from '../utils/hourPreferences';
import ScrollArea from 'react-scrollbar';

class ChipBank extends Component {
  render() {
    return <ScrollArea className={styles.scrollArea} speed={0.8} horizontal={true} >
      <Content {...this.props} />
    </ScrollArea>;
  }
}

class Content extends Component {
  render() {
    this.context.scrollArea.scrollXTo(50);
    const {chipsPlaced, numOpenSets} = this.props;
    return <div className={styles.container}>
      {_.map(RANKS, rank =>
        <div className="row" key={rank}>
         {_.map(_.range(numOpenSets + 5), col =>
           <div className="chip" key={col}>
              <DraggableChip disabled={col + 1 !== numOpenSets || !isValueAvailable(chipsPlaced, rank)} value={rank} />
           </div>)}
        </div>
      )}
    </div>;
  }
}

Content.contextTypes = {
  scrollArea: React.PropTypes.object
};

export default ChipBank;
