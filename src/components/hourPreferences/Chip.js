import { HOUR } from '../../constants/Constants';
import DraggableTypes from '../../constants/DraggableTypes';
import VisibleCalendarIcon from '../VisibleCalendarIcon';
import { RANKS } from '../../constants/Settings';
import _ from 'lodash';

export default props => (
  <VisibleCalendarIcon path='chips' file={`${props.value}.png`} itemType={DraggableTypes.CHIP} {...props} name={`Rank ${props.value}`}
  description={`Ranking your available slots from highest to lowest (1 to ${_.last(RANKS)}) communicates your preferred shifts.`} />
);
