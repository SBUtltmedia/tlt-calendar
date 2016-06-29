import { HOUR } from '../../constants/Constants';
import ItemTypes from '../../constants/ItemTypes';
import CalendarIcon, { getSize, getImage } from '../CalendarIcon';

export function getChipSize(callback) {
  getSize('chips', 1, callback);
}

export default props => (
  <CalendarIcon path='chips' file={props.value} itemType={ItemTypes.CHIP} {...props} />
);
