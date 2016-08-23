import { HOUR } from '../../constants/Constants';
import CalendarIcon from '../CalendarIcon';
import { RANKS } from '../../constants/Settings';
import { renderToStaticMarkup } from 'react-dom/server';
import _ from 'lodash';
import './Chip.scss';

//const req = require.context('img/chips', true, /^\.\/.*$/);
//const getImgSrc = value => req(`./${value}.svg`);

const ViewComponent = ({value}) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox="0 0 50 50" className={`chip_${value}`}>
    <g>
      <circle cx="25" cy="25" r="20" />
      <text textAnchor="middle" alignmentBaseline="central" x="50%" y="50%"
      fontFamily="sans-serif" fontSize="30">
        {value}
      </text>
    </g>
  </svg>
);

function getSvgString(props) {
  return "data:image/svg+xml;charset=utf-8," + renderToStaticMarkup(<ViewComponent {...props} />);
}

export default props => (
  <CalendarIcon {...props} name={`Rank ${props.value}`} viewComponent={ViewComponent} imgSrc={getSvgString(props)}
  description={`Ranking your available slots from highest to lowest (1 to ${_.last(RANKS)}) communicates your preferred shifts.`} />
);
