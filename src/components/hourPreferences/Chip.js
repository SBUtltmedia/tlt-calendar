import { HOUR } from '../../constants/Constants';
import CalendarImage, { getSize, getImage } from '../CalendarImage';
const FORMAT = 'png';

export function getChipImage(value, callback) {
  const image = new Image();
  image.src = getImage('chips', value, callback);
  image.onload = () => callback(image);
}

export function getChipSize(callback) {
  getSize('chips', 1, callback);
}

export default ({value, minute, duration=HOUR}) => (
  <CalendarImage path='chips' file={value} minute={minute} duration={duration} />
);
