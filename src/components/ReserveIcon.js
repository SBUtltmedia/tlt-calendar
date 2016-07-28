import { RESERVED } from '../constants/Constants';
import CalendarIcon from './CalendarIcon';

const imgSrc = require=('img/admin/X.png');

const ViewComponent = ({value}) => (
  <img src={imgSrc} />
);

export default props => (
  <CalendarIcon {...props} value={RESERVED} viewComponent={ViewComponent} imgSrc={imgSrc}
  name="Reserve" description="Admins can prevent employees from taking specific slots by blocking them out." />
);
