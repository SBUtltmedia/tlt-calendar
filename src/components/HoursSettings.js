import styles from './HoursSettings.scss';

export default () => (
  <form className={styles.container}>
    <div>
      <label for="hours-desired">Weekly hours desired</label>
      <input id="hours-desired" />
    </div>
    <div>
      Main library required hours: {4}
    </div>
  </form>
)
