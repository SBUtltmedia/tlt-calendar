import { RESERVED } from '../constants/Constants';
import DraggableTypes from '../constants/DraggableTypes';
import VisibleCalendarIcon from './VisibleCalendarIcon';

export default props => (
  <VisibleCalendarIcon path='admin' file='X' itemType={DraggableTypes.RESERVE} {...props} value={RESERVED}
  name="Reserve" description="Admins can prevent employees from taking specific slots by blocking them out." />
);
