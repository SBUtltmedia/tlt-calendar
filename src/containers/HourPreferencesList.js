import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import _ from 'lodash';

const HourPreferencesList = ({employees}) => (
  <div>
    <ul>
      {_.map(employees, (emp, i) => <li key={i}><Link to={`/preferences/${emp.netId}`}>{emp.lastName}, {emp.firstName}</Link></li>)}
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
