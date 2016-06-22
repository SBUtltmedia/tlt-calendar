import { HOUR } from '../constants/Constants';

export function getFullChipImage(value) {
  return require(`../../img/chips/${value}.png`);
}

export function getChipImage(value, callback) {
  const image = new Image();
  image.src = getFullChipImage(value);
  image.onload = () => callback(image);
}

export function getSize(callback) {
  getChipImage(1, image => {
    callback({
      width: image.width,
      height: image.height
    });
  });
}

export default ({value, minute, duration=HOUR}) => (
  <img style={{float: minute === 30 ? 'right' : 'left'}}
  src={require(`../../img/chips/${value + (duration === HOUR ? '' : ('half' + (minute === 30 ? '1' : '2' )))}.png`)} />
);
