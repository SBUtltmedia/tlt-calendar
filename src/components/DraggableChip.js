import React, { PropTypes, Component } from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from '../constants/ItemTypes';
import Chip from './Chip';

const boxSource = {
    beginDrag(props) {
        return {
            //source: props.source
        };
    }
};

@DragSource(ItemTypes.CHIP, boxSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))
export default class DraggableChip extends Component {
    static propTypes = {
        disabled: PropTypes.bool,
        connectDragSource: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired
    };

    render() {
        const { connectDragSource, isDragging, disabled } = this.props;
        const opacity = isDragging || disabled ? 0.4 : 1;
        const chip = <div style={{opacity}}><Chip value={1} /></div>;
        return disabled ? chip : connectDragSource(chip);
    }
}
