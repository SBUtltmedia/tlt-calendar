import { RESERVED } from '../constants/Constants';
import DraggableTypes from '../constants/DraggableTypes';
import CalendarIcon from './CalendarIcon';

const ViewComponent = ({value}) => (
  <img src={require=('img/admin/X.png')} style={{width: '100%', height: '100%'}} />
);

export default props => (
  <CalendarIcon itemType={DraggableTypes.RESERVE} {...props} value={RESERVED} viewComponent={ViewComponent}
  name="Reserve" description="Admins can prevent employees from taking specific slots by blocking them out." />
);
