import Slot from './Slot';
import styles from './SlotsBank.scss';
import { TWO_HOURS, HALF_HOUR } from '../../constants/Constants';

export default () => (
  <div className={styles.container}>
    <Slot value="2hr" duration={TWO_HOURS} />
    <Slot value="1hr" duration={HALF_HOUR} />
  </div>
);
