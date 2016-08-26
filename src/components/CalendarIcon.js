import { Component, PropTypes, Children, cloneElement } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragSource } from 'react-dnd';
import _ from 'lodash';
import styles from './CalendarIcon.scss';
import * as InfoBoxActions from '../actions/CalendarInfoBoxActions';
import { setDraggingItem, clearDraggingItem } from '../actions/DndActions';
import { ACTION } from '../constants/InfoBoxTypes';
import { CALENDAR_ITEM } from '../constants/DraggableTypes';
import { HOUR, HALF_HOUR } from '../constants/Constants';
import { compareTimes } from '../utils/time';

const dragSource = {
    beginDrag(props) {
      const {setDraggingItem, day, hour, minute, connectedItem} = props;
      setDraggingItem({day, hour, minute, connectedItem});
      return _.pick(props, ['value', 'day', 'hour', 'minute', 'duration', 'visibleDuration', 'connectedItem', 'disabled']);
    },
    endDrag(props) {
      props.clearDraggingItem();
    }
};

const calculateWidth = ({size, duration}) => duration ? Math.round(size * duration / 60) : size;

@DragSource(CALENDAR_ITEM, dragSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
}))
class CalendarIcon extends Component {
  static propTypes = {
    viewComponent: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    day: PropTypes.number,
    hour: PropTypes.number,
    minute: PropTypes.number,
    duration: PropTypes.number.isRequired,
    visibleDuration: PropTypes.number,
    connectedItem: PropTypes.object,
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    fillInfoBox: PropTypes.func.isRequired,
    clearInfoBox: PropTypes.func.isRequired,
    size: PropTypes.any,
    className: PropTypes.string,
    img: PropTypes.element.isRequired
  };

  componentDidMount() {
    const { size, connectDragPreview } = this.props;
    connectDragPreview(<div style={`width:${calculateWidth(this.props)}px; height:${size}px`}></div>);
  }

  fillInfoBox() {
    const { img, fillInfoBox, name, description, day } = this.props;
    if (day === null || day === undefined) {  // If isn't on the calendar (if it is, we want the underlying cell's info)
      fillInfoBox({name, description, img});
    }
  }

  isConnectedItemDragging() {
    const {connectedItem, draggingItem} = this.props;
    return connectedItem && draggingItem && compareTimes(connectedItem, draggingItem) === 0;
  }

  getClassName() {
    const {day, disabled, isDragging, className} = this.props;
    const transparent = disabled && (day === null || day === undefined);
    const showDragging = isDragging || this.isConnectedItemDragging();
    return `${styles.icon}${disabled ? ' disabled' : ''}${transparent ? ' transparent' : ''}${showDragging ? ' dragging' : ''}${className ? ` ${className} `: ''}`
  }

  render() {
    const {value, disabled, connectDragSource, size, clearInfoBox, viewComponent, style, duration, visibleDuration=duration} = this.props;
    const overflow = visibleDuration === HALF_HOUR ? 'hidden' : '';
    const width = calculateWidth(this.props);
    return connectDragSource(
      <div style={{...style, overflow, width: width, height: size, marginRight: size - width}}
           className={this.getClassName()} onMouseEnter={() => this.fillInfoBox()} onMouseLeave={clearInfoBox}>
        {viewComponent({disabled, value, duration, visibleDuration})}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  draggingItem: state.dnd.draggingItem
});

const mapDispatchToProps = dispatch => {
  const infoBoxActions = bindActionCreators(InfoBoxActions, dispatch);
  return {
    fillInfoBox: _.bind(infoBoxActions.fillInfoBox, {}, ACTION),
    clearInfoBox: infoBoxActions.clearInfoBox,
    setDraggingItem: item => dispatch(setDraggingItem(item)),
    clearDraggingItem: () => dispatch(clearDraggingItem())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarIcon);
