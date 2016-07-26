import { HOUR } from '../constants/Constants';
import DraggableTypes from '../constants/DraggableTypes';
import CalendarIcon from './CalendarIcon';
import EmployeeIcon from './EmployeeIcon';

const ViewComponent = ({value}) => {
  console.log("ViewComponent", value);
  return <EmployeeIcon employee={value} />
};

export default props => (
  <CalendarIcon itemType={DraggableTypes.EMPLOYEE} {...props} name={props.value.name} description={props.value.name}
  viewComponent={ViewComponent} />
);
