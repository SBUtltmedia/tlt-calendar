import { HOUR } from '../constants/Constants';
const FORMAT = 'png';

export function getImage(path, file, callback) {
  const image = new Image();
  image.src = require('img/' + path + '/' + file + '.' + FORMAT);
  image.onload = () => callback(image);
}

export function getSize(path, file, callback) {
  getImage(path, file, image => {
    callback({
      width: image.width,
      height: image.height
    });
  });
}

export default ({path, file, minute, duration=HOUR}) => (
  <img style={{float: minute === 30 ? 'right' : 'left'}}
  src={require(`img/${path}/${file}${(duration === HOUR ? '' : ('half' + (minute === 30 ? '1' : '2' )))}.${FORMAT}`)} />
);
