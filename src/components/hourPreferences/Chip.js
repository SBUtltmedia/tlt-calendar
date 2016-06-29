import { HOUR } from '../../constants/Constants';
import CalendarImage from '../CalendarImage';
const FORMAT = 'png';

export function getFullChipImage(value) {
  return require(`img/chips/${value}.${FORMAT}`);
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
  <CalendarImage baseImgSrc={`chips/${value}`} minute={minute} duration={duration} />
);
