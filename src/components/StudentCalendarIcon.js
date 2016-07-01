import { HOUR } from '../constants/Constants';
import DraggableTypes from '../constants/DraggableTypes';
import VisibleCalendarIcon from './VisibleCalendarIcon';

export default props => (
  <VisibleCalendarIcon path='users' file={props.icon} itemType={DraggableTypes.EMPLOYEE} {...props}
  name={props.name} description={props.name} />
);
