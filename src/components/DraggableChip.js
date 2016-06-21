import React, { PropTypes, Component } from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from '../constants/ItemTypes';
import Chip, { getFullChipImage } from './Chip';

const boxSource = {
    beginDrag(props) {
        return {
            value: props.value
        };
    }
};

@DragSource(ItemTypes.CHIP, boxSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
}))
export default class DraggableChip extends Component {
    static propTypes = {
        disabled: PropTypes.bool,
        connectDragSource: PropTypes.func.isRequired,
        connectDragPreview: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        value: PropTypes.number.isRequired
    };

    componentDidMount() {
        const { connectDragPreview, value } = this.props;
        const image = new Image();
        image.src = getFullChipImage(value);
        image.onload = () => connectDragPreview(image);
    }

    render() {
        const { connectDragSource, isDragging, disabled, value } = this.props;
        const opacity = isDragging || disabled ? 0.4 : 1;
        const chip = <div style={{opacity}}><Chip value={value} /></div>;
        return disabled ? chip : connectDragSource(chip);
    }
}
