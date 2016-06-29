import { HOUR } from '../../constants/Constants';
import DraggableTypes from '../../constants/DraggableTypes';
import CalendarIcon, { getSize, getImage } from '../CalendarIcon';

export function getReserveIconSize(callback) {
  getSize('admin', 'X', callback);
}

export default props => (
  <CalendarIcon path='admin' file='X' itemTypes={DraggableTypes.RESERVE} {...props} />
);
