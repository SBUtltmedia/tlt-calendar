import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import styles from './HourPreferencesList.scss';
import _ from 'lodash';

const HourPreferencesList = ({employees}) => (
  <div className={styles.container}>
    <ul>
      {_.map(employees, (emp, i) => <li key={i}><Link to={`/preferences/${emp.netid}`}>{emp.name}</Link></li>)}
    </ul>
  </div>
);

const mapStateToProps = state => ({
  employees: state.employees
});

export default connect(
  mapStateToProps,
  {}
)(HourPreferencesList);
