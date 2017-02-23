import {connect} from 'react-redux'
import EmployeeIcon from './EmployeeIcon'
import styles from './UserTitle.scss'

const UserTitle = ({employee}) => (
  <div>
    {employee &&
      <div className={styles.container}>
        <div className="icon">
          {employee ? <EmployeeIcon employee={employee} /> : null}
        </div>
        <span className="name">
          {employee.firstName + ' ' + employee.lastName}
        </span>
      </div>
    }
  </div>
);

const mapStateToProps = state => ({
	employee: state.user
})

export default connect(mapStateToProps)(UserTitle)
