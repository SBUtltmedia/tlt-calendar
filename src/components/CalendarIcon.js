import { Component, PropTypes, Children, cloneElement } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragSource } from 'react-dnd';
import _ from 'lodash';
import styles from './CalendarIcon.scss';
import * as InfoBoxActions from '../actions/CalendarInfoBoxActions';
import { ACTION } from '../constants/InfoBoxTypes';
import { CALENDAR_ITEM } from '../constants/DraggableTypes';

const dragSource = {
    beginDrag(props) {
      return _.pick(props, ['value', 'day', 'hour', 'minute', 'duration', 'disabled']);
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
    duration: PropTypes.number,
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    fillInfoBox: PropTypes.func.isRequired,
    clearInfoBox: PropTypes.func.isRequired,
    size: PropTypes.any,
    className: PropTypes.string
  };

  componentDidMount() {
    const { size, connectDragPreview } = this.props;
    connectDragPreview(<div style={`width:${calculateWidth(this.props)}px; height:${size}px`}></div>);
  }

  fillInfoBox() {
    const { imgSrc, fillInfoBox, name, description, day } = this.props;
    if (day === null || day === undefined) {  // If isn't on the calendar (if it is, we want the underlying cell's info)
      fillInfoBox({name, description, imgSrc});
    }
  }

  render() {
    const {day, value, disabled, connectDragSource, isDragging, size, clearInfoBox, viewComponent, style, className} = this.props;
    return connectDragSource(
      <div style={{...style, width: calculateWidth(this.props), height: size}}
            className={`${styles.icon}${disabled ? ' disabled' : ''}${isDragging ? ' dragging' : ''}${className ? ` ${className} `: ''}`}
            onMouseEnter={() => this.fillInfoBox()} onMouseLeave={clearInfoBox}>
        {viewComponent({disabled, value})}
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
)(CalendarIcon);
