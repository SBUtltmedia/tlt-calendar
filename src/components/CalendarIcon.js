import { HOUR, HALF_HOUR } from '../constants/Constants';
import { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import _ from 'lodash';
import styles from './CalendarIcon.scss';
import { halfCssSize } from '../utils/style.js';

const req = require.context('img', true, /^\.\/.*$/);

function getImageByPath(path, options, callback) {
  const image = new Image(options.width, options.height);
  image.src = req(path);
  image.onload = () => callback(image);
}

function getImage(path, file, options, callback) {
  getImageByPath('./' + path + '/' + file, options, callback);
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
export default class CalendarIcon extends Component {
  static propTypes = {
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

  getFilePath() {
    const {path, file, minute, duration=HOUR} = this.props;
    return './' + path + '/' + file;
  }

  componentDidMount() {
    const { connectDragPreview, path, file, size } = this.props;
    getImageByPath(this.getFilePath(), {width: size, height: size}, image => {
      //connectDragPreview(image);
      connectDragPreview(<div style={`width:${size}px; height:${size}px`}></div>);
    });
  }

  fillInfoBox(icon) {
    const { fillInfoBox, name, description, day } = this.props;
    if (day === null || day === undefined) {  // If isn't on the calendar (if it is, we want the underlying cell's info)
      fillInfoBox({name, description, icon});
    }
  }

  render() {
    const {minute, disabled, connectDragSource, isDragging, duration, day, hour, size, clearInfoBox} = this.props;
    const opacity = isDragging || disabled ? 0.1 : 1;
    const icon = req(this.getFilePath());
    const width = duration === HALF_HOUR ? halfCssSize(size) : size;
    const maxWidth = duration === HALF_HOUR ? width : '';
    const marginLeft = duration === HALF_HOUR && minute === 30 ? width : '';
    const overflow = duration === HALF_HOUR ? 'hidden' : '';
    const position = duration === HALF_HOUR ? 'absolute' : '';
    return connectDragSource(
      <div style={{maxWidth, marginLeft, overflow, position}}>
        <img className={styles.icon} src={icon} onMouseEnter={this.fillInfoBox.bind(this, icon)} onMouseLeave={clearInfoBox}
        style={{opacity, width: size, height: size, float: minute === 30 ? 'left' : 'right'}} />
      </div>
    );
  }
}
