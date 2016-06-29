import { HOUR } from '../../constants/Constants';
import DraggableTypes from '../../constants/DraggableTypes';
import CalendarIcon from '../CalendarIcon';

export default props => (
  <CalendarIcon path='chips' file={props.value} itemTypes={DraggableTypes.CHIP} {...props} />
);
