import { HOUR } from '../../constants/Constants';
import DraggableTypes from '../../constants/DraggableTypes';
import VisibleCalendarIcon from '../VisibleCalendarIcon';

export default props => (
  <VisibleCalendarIcon path='admin' file='X' itemTypes={DraggableTypes.RESERVE} {...props}
  name="Reserve" description="Admins can prevent employees from taking specific slots by blocking them out." />
);
