import React, { PropTypes, Component } from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from '../constants/ItemTypes';
import Chip, { getChipImage } from './Chip';

const boxSource = {
    beginDrag(props) {
        return {
            value: props.value,
            disabled: props.disabled
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
        getChipImage(value, connectDragPreview);
    }

    render() {
        const { connectDragSource, isDragging, disabled, value } = this.props;
        const opacity = isDragging || disabled ? 0.1 : 1;
        return connectDragSource(<div style={{opacity}}><Chip value={value} /></div>);
    }
}
