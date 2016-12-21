import Griddle from 'griddle-react';
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { nestSlots } from '../utils/data';

import * as _ from 'lodash';

class SlotsView extends Component {
  render() {
    const {slots, schedule, location} = this.props;
    return _.isEmpty(slots) ? <div></div> : (<div>
      <Griddle results={slots[schedule][location]}
      columns={['Day', 'Start Time', 'End Time']}
        showPager={false} resultsPerPage={999} useFixedLayout={false} />
    </div>);
  }
}

export default connect(
  state => ({
    slots: nestSlots(state.slots)
  }),
	{}
)(SlotsView);
