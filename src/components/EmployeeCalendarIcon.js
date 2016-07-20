import { HOUR } from '../constants/Constants';
import DraggableTypes from '../constants/DraggableTypes';
import CalendarIcon from './CalendarIcon';
import EmployeeIcon from './EmployeeIcon';

export default props => (
  <CalendarIcon itemType={DraggableTypes.EMPLOYEE} {...props} name={props.value.name} description={props.value.name}>
    <EmployeeIcon employee={props.value} />
  </CalendarIcon>
);
