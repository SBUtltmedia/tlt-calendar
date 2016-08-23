import { EIGHT_HOURS, FOUR_HOURS, TWO_HOURS, HOUR, HALF_HOUR } from '../../constants/Constants';
import { renderToStaticMarkup } from 'react-dom/server';
import CalendarIcon from '../CalendarIcon';
import _ from 'lodash';
import styles from './Slot.scss';

const handle = 3;

const ViewComponent = ({duration}) => {
  const key = String(duration);
  return <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox={`0 0 ${duration} 60`} className={`slot_${duration}`}>
    <g>
      <rect width={handle} height='60' x='0' y='0' />
      <rect width={duration - handle * 2} height={60 - handle * 2} x={handle} y={handle} style={{fillOpacity: 0.5}} />
      <rect width={handle} height='60' x={duration - handle} y='0' />
    </g>
  </svg>
};

function getSvgString(props) {
  return "data:image/svg+xml;charset=utf-8," + renderToStaticMarkup(<ViewComponent {...props} />);
}

export default props => {
  return <CalendarIcon {...props} viewComponent={ViewComponent} imgSrc={getSvgString(props)}
  name={`${props.duration/60} hour slot`} description={`Set the slots that employees can have shifts at this location.`} />
};
