import { Component } from 'react';
import styles from './Trash.scss';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../constants/ItemTypes';

const trashTarget = {
  drop(props, monitor) {
    props.removeItem(monitor.getItem());
  },
  canDrop(props, monitor) {
    return !!monitor.getItem().day;  // If it's placed on the calendar grid
  }
};

// TODO: Add EMPLOYEE or ALL_ADMIN type?
@DropTarget([ItemTypes.CHIP, ItemTypes.RESERVE], trashTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
export default class Trash extends Component {
	render() {
		return this.props.connectDropTarget(
			<div className={styles.container}>
				<i className="fa fa-trash fa-4"></i>
			</div>
		);
	}
}