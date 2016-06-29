import { HOUR } from '../constants/Constants';
import { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import _ from 'lodash';
const FORMAT = 'png';
const req = require.context('img', true, /^\.\/.*\.png$/);

function getImageByPath(path, callback) {
  const image = new Image();
  image.src = req(path);
  image.onload = () => callback(image);
}

function getImage(path, file, callback) {
  getImageByPath('./' + path + '/' + file + '.' + FORMAT, callback);
}

export function getSize(path, file, callback) {
  getImage(path, file, image => {
    callback({
      width: image.width,
      height: image.height
    });
  });
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
    itemType: PropTypes.string.isRequired
  };

  getFilePath() {
    const {path, file, minute, duration=HOUR} = this.props;
    return './' + path + '/' + file + (duration === HOUR ? '' : ('half' + (minute === 30 ? '1' : '2' ))) + '.' + FORMAT;
  }

  componentDidMount() {
    const { connectDragPreview, path, file } = this.props;
    getImageByPath(this.getFilePath(), connectDragPreview);
  }

  render() {
    const {minute, disabled, connectDragSource, isDragging} = this.props;
    const opacity = isDragging || disabled ? 0.1 : 1;
    return connectDragSource(<img style={{opacity, float: minute === 30 ? 'right' : 'left'}} src={req(this.getFilePath())} />);
  }
}
