import { HOUR } from '../../constants/Constants';
import CalendarIcon from '../CalendarIcon';
import { RANKS } from '../../constants/Settings';
import _ from 'lodash';

const req = require.context('img/chips', true, /^\.\/.*$/);
const getImgSrc = value => req(`./${value}.svg`);

const ViewComponent = ({value}) => (
  <img src={getImgSrc(value)} />
);

export default props => (
  <CalendarIcon {...props} name={`Rank ${props.value}`} viewComponent={ViewComponent} imgSrc={getImgSrc(props.value)}
  description={`Ranking your available slots from highest to lowest (1 to ${_.last(RANKS)}) communicates your preferred shifts.`} />
);
