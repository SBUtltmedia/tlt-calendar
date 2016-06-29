import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './Trash.scss';
import { DropTarget } from 'react-dnd';
import * as InfoBoxActions from '../actions/CalendarInfoBoxActions';
import { ACTION } from '../constants/InfoBoxTypes';

const trashTarget = {
  drop(props, monitor) {
    props.removeItem(monitor.getItem());
  },
  canDrop(props, monitor) {
    return !!monitor.getItem().day;  // If it's placed on the calendar grid
  }
};

function getClassName({isOver, canDrop}) {
  if (isOver && canDrop) { return 'over'; }
  if (isOver && !canDrop) { return 'reject'; }
  if (!isOver && canDrop) { return 'enabled'; }
  return '';
}

@DropTarget(props => props.itemTypes, trashTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
class Trash extends Component {
    static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    removeItem: PropTypes.func.isRequired,
    itemTypes: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    fillInfoBox: PropTypes.func.isRequired,
    clearInfoBox: PropTypes.func.isRequired,
  };

  fillInfoBox(icon) {
    const name = "Trash";
    const description = "Drag items from the calendar to here to remove them.";
    this.props.fillInfoBox({name, description, icon});
  }

	render() {

    // TODO: There's no icon for this? It's a font. Eventually it'll be an image though....
    const icon = null;

    const {connectDropTarget, clearInfoBox} = this.props;
		return connectDropTarget(
			<div className={styles.container}
      onMouseEnter={this.fillInfoBox.bind(this, icon)} onMouseLeave={clearInfoBox}>
				<i className={`fa fa-trash fa-4 ${getClassName(this.props)}`}></i>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
  const infoBoxActions = bindActionCreators(InfoBoxActions, dispatch);
  return {
    fillInfoBox: _.bind(infoBoxActions.fillInfoBox, {}, ACTION),
    clearInfoBox: infoBoxActions.clearInfoBox
  }
};

export default connect(
  state => ({}),
  mapDispatchToProps
)(Trash);