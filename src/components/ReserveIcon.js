import { RESERVED } from '../constants/Constants';
import DraggableTypes from '../constants/DraggableTypes';
import CalendarIcon from './CalendarIcon';

export default props => (
  <CalendarIcon path='admin' file='X.png' itemType={DraggableTypes.RESERVE} {...props} value={RESERVED}
  name="Reserve" description="Admins can prevent employees from taking specific slots by blocking them out." />
);
