import { renderToStaticMarkup } from 'react-dom/server';
import { RESERVED } from '../constants/Constants';
import CalendarIcon from './CalendarIcon';
import styles from './EmployeeIcon.scss';

const ViewComponent = () => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox="0 0 50 50" className={styles.icon}>
    <g>
      <rect width='100%' height='100%' style={{fill:"#F00"}} />
      <text textAnchor="middle" alignmentBaseline="central" x="50%" y="50%" fill="#FFF"
      fontFamily="sans-serif" fontSize="30" style={{fontWeight: 'bold'}}>
        R
      </text>
    </g>
  </svg>
);

const imgSrc = "data:image/svg+xml;charset=utf-8," + renderToStaticMarkup(<ViewComponent />);

export default props => (
  <CalendarIcon {...props} value={RESERVED} viewComponent={ViewComponent} imgSrc={imgSrc}
  name="Reserved" description="Admins can prevent employees from taking specific slots by blocking them out." />
);
