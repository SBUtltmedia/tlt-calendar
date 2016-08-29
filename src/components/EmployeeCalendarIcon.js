import { HOUR } from '../constants/Constants';
import CalendarIcon from './CalendarIcon';
import EmployeeIcon from './EmployeeIcon';

const ViewComponent = ({value}) => (
  <EmployeeIcon employee={value} />
);

export default props => (
  <CalendarIcon {...props} name={props.value.firstName + ' ' + props.value.lastName} description=''
    viewComponent={ViewComponent} img={<EmployeeIcon employee={props.value} />} />
);
