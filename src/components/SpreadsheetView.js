import Griddle from 'griddle-react'
import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { nestSpreadsheetItems } from '../utils/data'
import * as _ from 'lodash'
import { DropdownButton, MenuItem } from 'react-bootstrap'

const SelectorDropdown = ({items, selectedItem, keyName, onUpdate}) => (
  <DropdownButton title={selectedItem} id={keyName}>
    {items.map(item => <MenuItem active={item === selectedItem} key={item}
      onSelect={() => onUpdate(keyName, item)}>
      {item}
    </MenuItem>)}
  </DropdownButton>
)

SelectorDropdown.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedItem: PropTypes.string,
  keyName: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired
}

class SlotsView extends Component {
  static propTypes = {
    mapStateToData: PropTypes.func.isRequired,
    columns: PropTypes.arrayOf(PropTypes.string)
  }

  constructor(props) {
    super(props)
    const {schedule, location} = props
    this.state = {schedule, location}
  }

  updateSelection(keyName, value) {
    const x = {}
    x[keyName] = value
    this.setState(x)
  }

  renderDropdown(items, selectedItem, keyName) {
    return <SelectorDropdown items={items} selectedItem={selectedItem || items[0]}
    keyName={keyName} onUpdate={this.updateSelection.bind(this)} />
  }

  render() {
    const {items, columns} = this.props
    const schedules = _.keys(items)
    const locations = _.keys(_.values(items)[0])
    const {schedule=schedules[0], location=locations[0]} = this.state
    return _.isEmpty(items) ? <div></div> :
    (<div>
      <div>
        {this.renderDropdown(schedules, schedule, 'schedule')}
        {this.renderDropdown(locations, location, 'location')}
      </div>
      <div>
        <Griddle results={items[schedule][location]} columns={columns}
          showPager={false} resultsPerPage={999} useFixedLayout={false} />
      </div>
    </div>)
  }
}

export default connect(
  (state, ownProps) => ({
    items: nestSpreadsheetItems(ownProps.mapStateToData(state))
  }),
	{}
)(SlotsView)
