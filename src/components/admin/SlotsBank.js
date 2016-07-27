import Slot from './Slot';
import styles from './SlotsBank.scss';

export default () => (
  <div className={styles.container}>
    <Slot value="2hr" />
    <Slot value="1hr" />
  </div>
);
