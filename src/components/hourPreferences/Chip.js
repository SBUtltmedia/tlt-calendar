import { HOUR } from '../../constants/Constants';
import { CHIP } from '../../constants/DraggableTypes';
import CalendarIcon from '../CalendarIcon';
import { RANKS } from '../../constants/Settings';
import _ from 'lodash';

const req = require.context('img/chips', true, /^\.\/.*$/);

const ViewComponent = ({value}) => (
  <img src={req(`./${value}.png`)} />
);

export default props => (
  <CalendarIcon itemType={CHIP} {...props} name={`Rank ${props.value}`} viewComponent={ViewComponent}
  description={`Ranking your available slots from highest to lowest (1 to ${_.last(RANKS)}) communicates your preferred shifts.`} />
);
