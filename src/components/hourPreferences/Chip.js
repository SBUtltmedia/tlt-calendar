import { HOUR } from '../../constants/Constants';
import ItemTypes from '../../constants/ItemTypes';
import CalendarIcon from '../CalendarIcon';

export default props => (
  <CalendarIcon path='chips' file={props.value} itemType={ItemTypes.CHIP} {...props} />
);
