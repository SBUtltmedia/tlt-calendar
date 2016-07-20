import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragSource } from 'react-dnd';
import { HOUR, HALF_HOUR } from '../constants/Constants';
import _ from 'lodash';
import styles from './CalendarIcon.scss';
import { halfCssSize } from '../utils/style.js';
import * as InfoBoxActions from '../actions/CalendarInfoBoxActions';
import { ACTION } from '../constants/InfoBoxTypes';

function getImage(imageSrc, options, callback) {
  const image = new Image(options.width, options.height);
  image.src = imageSrc;
  image.onload = () => callback(image);
}

const dragSource = {
    beginDrag(props) {
      // TODO: The 'value' field is only for chips, so should it be removed?
      return _.pick(props, ['value', 'day', 'hour', 'minute', 'duration', 'disabled']);
    }
};

@DragSource(props => props.itemType, dragSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
}))
class CalendarIcon extends Component {
  static propTypes = {
    imageSrc: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    day: PropTypes.number,
    hour: PropTypes.number,
    minute: PropTypes.number,
    duration: PropTypes.number,
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    itemType: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    fillInfoBox: PropTypes.func.isRequired,
    clearInfoBox: PropTypes.func.isRequired,
    size: PropTypes.any
  };

  componentDidMount() {
    const { connectDragPreview, imageSrc, size } = this.props;
    getImage(imageSrc, {width: size, height: size}, image => {
      //connectDragPreview(image);
      connectDragPreview(<div style={`width:${size}px; height:${size}px`}></div>);
    });
  }

  fillInfoBox() {
    const { imageSrc, fillInfoBox, name, description, day } = this.props;
    if (day === null || day === undefined) {  // If isn't on the calendar (if it is, we want the underlying cell's info)
      fillInfoBox({name, description, imageSrc});
    }
  }

  render() {
    const {imageSrc, minute, disabled, connectDragSource, isDragging, duration, day, hour, size, clearInfoBox} = this.props;
    const opacity = isDragging || (disabled && (day === null || day === undefined)) ? 0.1 : 1;
    const width = duration === HALF_HOUR ? halfCssSize(size) : size;
    const maxWidth = duration === HALF_HOUR ? width : '';
    const marginLeft = duration === HALF_HOUR && minute === 30 ? width : '';
    const overflow = duration === HALF_HOUR ? 'hidden' : '';
    const position = duration === HALF_HOUR ? 'absolute' : '';
    return connectDragSource(
      <div style={{maxWidth, marginLeft, overflow, position}}>
        <img className={styles.icon} onMouseEnter={() => this.fillInfoBox} onMouseLeave={clearInfoBox}
        src={imageSrc} style={{opacity, width: size, height: size, float: minute === 30 ? 'left' : 'right'}} />
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
