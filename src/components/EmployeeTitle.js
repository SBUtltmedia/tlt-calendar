import React, {PropTypes} from 'react'
import EmployeeIcon from './EmployeeIcon'
import styles from './EmployeeTitle.scss'

const EmployeeTitle = ({employee}) => (
  <div>
    {employee &&
      <div className={styles.container}>
        <div className="icon">
          <EmployeeIcon employee={employee} />
        </div>
        <span className="name">
          {(employee.firstName || '') + ' ' + (employee.lastName || '')}
        </span>
      </div>
    }
  </div>
);

EmployeeTitle.propTypes = {
  employee: PropTypes.object
}

export default EmployeeTitle
