import { HOUR } from '../../constants/Constants';
import CalendarIcon from '../CalendarIcon';
import _ from 'lodash';

const req = require.context('img/slots', true, /^\.\/.*$/);

const ViewComponent = ({value}) => (
  <img src={req(`./${value}.svg`)} />
);

export default props => (
  <CalendarIcon {...props} name={`${props.value} slot`} viewComponent={ViewComponent}
  description={`Set the slots that employees can have shifts at this location.`} />
);
