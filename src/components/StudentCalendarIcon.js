import { HOUR } from '../constants/Constants';
import DraggableTypes from '../constants/DraggableTypes';
import CalendarIcon from './CalendarIcon';

export default props => (
  <CalendarIcon path='users' file={props.value.icon} itemType={DraggableTypes.EMPLOYEE} {...props}
  name={props.value.name} description={props.value.name} />
);
