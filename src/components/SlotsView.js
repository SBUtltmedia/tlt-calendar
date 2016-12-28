import Griddle from 'griddle-react'
import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { nestSlots } from '../utils/data'
import { DropdownButton, MenuItem } from 'react-bootstrap'
import * as _ from 'lodash'

class SlotsView extends Component {

  constructor(props) {
    super(props)
    const {schedule, location} = props
    this.state = {schedule, location}
  }

  updateSelection(key, value) {
    const x = {}
    x[key] = value
    this.setState(x)
  }

  renderDropdown(items, selectedItem, key) {
    return (<DropdownButton title={selectedItem} id={key}>
      {items.map(item => <MenuItem active={item === selectedItem} key={item}
        onSelect={() => this.updateSelection(key, item)}>
        {item}
      </MenuItem>)}
    </DropdownButton>)
  }

  render() {
    const {slots} = this.props
    const {schedule, location} = this.state
    const schedules = _.keys(slots)
    const locations = _.keys(_.values(slots)[0])
    return _.isEmpty(slots) ? <div></div> :
    (<div>
      <div>
        {this.renderDropdown(schedules, schedule, 'schedule')}
        {this.renderDropdown(locations, location, 'location')}
      </div>
      <div>
        <Griddle results={slots[schedule][location]}
        columns={['Day', 'Start Time', 'End Time', 'Shift Length']}
          showPager={false} resultsPerPage={999} useFixedLayout={false} />
      </div>
    </div>)
  }
}

export default connect(
  state => ({
    slots: nestSlots(state.slots)
  }),
	{}
)(SlotsView)
