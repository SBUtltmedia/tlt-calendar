import { EIGHT_HOURS, FOUR_HOURS, TWO_HOURS, HOUR, HALF_HOUR } from '../../constants/Constants';
import { renderToStaticMarkup } from 'react-dom/server';
import CalendarIcon from '../CalendarIcon';
import _ from 'lodash';

const colors = {};
colors[String(EIGHT_HOURS)] = '#F80';
colors[String(FOUR_HOURS)] = '#F0F';
colors[String(TWO_HOURS)] = '#06F';
colors[String(HOUR)] = '#090';

const handle = 3;

const ViewComponent = ({duration}) => {
  const key = String(duration);
  return <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox={`0 0 ${duration} 60`}>
    <g>
      <rect width={handle} height='60' x='0' y='0' style={{fill:colors[key], fillOpacity: 1}} />
      <rect width={duration - handle * 2} height={60 - handle * 2} x={handle} y={handle} style={{fill:colors[key], fillOpacity: 0.5}} />
      <rect width={handle} height='60' x={duration - handle} y='0' style={{fill:colors[key], fillOpacity: 1}} />
    </g>
  </svg>
};

function getSvgString(duration) {
  return "data:image/svg+xml;charset=utf-8," + renderToStaticMarkup(<ViewComponent duration={duration} />);
}

export default props => {
  return <CalendarIcon {...props} name={`${props.duration/60} hour slot`} viewComponent={ViewComponent} imgSrc={getSvgString(props.duration)}
  description={`Set the slots that employees can have shifts at this location.`} />
};
