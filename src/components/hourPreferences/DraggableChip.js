import React, { PropTypes, Component } from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from '../../constants/ItemTypes';
import Chip, { getChipImage } from './Chip';
import _ from 'lodash';

const boxSource = {
    beginDrag(props) {
      return _.pick(props, ['value', 'day', 'hour', 'minute', 'duration', 'disabled']);
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
        day: PropTypes.number,
        hour: PropTypes.number,
        minute: PropTypes.number,
        duration: PropTypes.number,
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
        const { connectDragSource, isDragging, disabled } = this.props;
        const opacity = isDragging || disabled ? 0.1 : 1;
        return connectDragSource(<div style={{opacity}}><Chip {...this.props} /></div>);
    }
}
