import { HOUR } from '../constants/Constants';
import DraggableTypes from '../constants/DraggableTypes';
import CalendarIcon from './CalendarIcon';
import {getEmployeeIcon} from '../utils/images';

export default props => (
  <CalendarIcon imageSrc={getEmployeeIcon(props.value)} itemType={DraggableTypes.EMPLOYEE} {...props}
  name={props.value.name} description={props.value.name} />
);
