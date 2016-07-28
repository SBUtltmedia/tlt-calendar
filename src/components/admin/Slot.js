import { HOUR } from '../../constants/Constants';
import CalendarIcon from '../CalendarIcon';
import _ from 'lodash';

const req = require.context('img/slots', true, /^\.\/.*$/);
const getImgSrc = value => req(`./${value}.svg`);

const ViewComponent = ({value}) => (
  <img src={getImgSrc(value)} />
);

export default props => (
  <CalendarIcon {...props} name={`${props.value} slot`} viewComponent={ViewComponent} imgSrc={getImgSrc(props.value)}
  description={`Set the slots that employees can have shifts at this location.`} />
);
