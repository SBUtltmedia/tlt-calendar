import { HOUR } from '../../constants/Constants';
import DraggableTypes from '../../constants/DraggableTypes';
import CalendarIcon from '../CalendarIcon';
import { RANKS } from '../../constants/Settings';
import _ from 'lodash';

const req = require.context('img/chips', true, /^\.\/.*$/);

export default props => (
  <CalendarIcon itemType={DraggableTypes.CHIP} {...props} name={`Rank ${props.value}`}
  description={`Ranking your available slots from highest to lowest (1 to ${_.last(RANKS)}) communicates your preferred shifts.`}>
    <img src={req(`./${props.value}.png`)} />
  </CalendarIcon>
);
