import styles from './HoursSettings.scss';

export default () => (
  <form className={styles.container}>
    <p>
      <label for="hours-desired">Weekly hours desired: </label>
      <input id="hours-desired" className="hours-desired value" value={10} onChange={() => {}} />
      <span className="star">*</span>
    </p>
    <p>
      Main library required hours: <span className="value">{4}</span>
    </p>
    <div className="notes">
      <p>This value determines your approximate ﬁnal hours.</p>
      <p>
        Enter as many preferences as you’d like and your
        schedule permits. The more availability you provide,
        the more changes of getting your first choice.
      </p>
    </div>
  </form>
)
