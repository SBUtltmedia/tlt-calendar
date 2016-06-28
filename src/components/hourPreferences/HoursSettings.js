import styles from './HoursSettings.scss';
import { NumberPicker } from 'react-widgets';
import numberLocalizer from 'react-widgets/lib/localizers/simple-number';
import 'react-widgets/dist/css/react-widgets.css';
numberLocalizer();


export default () => (
  <form className={styles.container}>
    <div className="weekly-hours-container">
      <label>Weekly hours desired:</label>
      <div className="number-picker">
        <NumberPicker min={10} max={29} defaultValue={10} />
      </div>
      <span className="star">*</span>
    </div>
    <div>
      Main library required hours: <span className="value">{4}</span>
    </div>
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
