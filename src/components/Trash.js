import { Component, PropTypes } from 'react';
import styles from './Trash.scss';
import { DropTarget } from 'react-dnd';

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
export default class Trash extends Component {
    static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    removeItem: PropTypes.func.isRequired,
    itemTypes: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
  };
	render() {
		return this.props.connectDropTarget(
			<div className={styles.container}>
				<i className={`fa fa-trash fa-4 ${getClassName(this.props)}`}></i>
			</div>
		);
	}
}