import { HOUR } from '../../constants/Constants';
import CalendarIcon from '../CalendarIcon';
import _ from 'lodash';
import styles from './Slot.scss';

const req = require.context('img/slots', true, /^\.\/.*$/);
const getImgSrc = value => req(`./${value}.svg`);

console.log(styles);

const ViewComponent = ({value}) => (
  <img style={{width:'100%', height: '100%'}} src={getImgSrc(value)} />
);

export default props => (
  <CalendarIcon {...props} name={`${props.value} slot`} viewComponent={ViewComponent} imgSrc={getImgSrc(props.value)}
  description={`Set the slots that employees can have shifts at this location.`} />
);
