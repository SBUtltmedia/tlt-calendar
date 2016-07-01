import { HOUR } from '../constants/Constants';
import DraggableTypes from '../constants/DraggableTypes';
import VisibleCalendarIcon from './VisibleCalendarIcon';

export default props => (
  <VisibleCalendarIcon path='users' file={props.value.icon} itemType={DraggableTypes.EMPLOYEE} {...props}
  name={props.value.name} description={props.value.name} />
);
