import { HOUR } from '../constants/Constants';
import CalendarIcon from './CalendarIcon';
import EmployeeIcon, { getImageSrc } from './EmployeeIcon';

const ViewComponent = ({value}) => (
  <EmployeeIcon employee={value} />
);

export default props => (
  <CalendarIcon {...props} name={props.value.name} description={props.value.name} viewComponent={ViewComponent}
    imgSrc={getImageSrc(props.value)} />
);
