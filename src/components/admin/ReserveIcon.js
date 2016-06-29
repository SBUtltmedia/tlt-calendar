import { HOUR } from '../../constants/Constants';
import ItemTypes from '../../constants/ItemTypes';
import CalendarIcon, { getSize, getImage } from '../CalendarIcon';

export function getReserveIconSize(callback) {
  getSize('admin', 'X', callback);
}

export default props => (
  <CalendarIcon path='admin' file='X' itemTypes={ItemTypes.RESERVE} {...props} />
);
