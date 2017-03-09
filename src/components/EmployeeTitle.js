import React, {PropTypes} from 'react'
import styles from './EmployeeTitle.scss'

const EmployeeTitle = ({employee}) => (
  <div>
    {employee &&
      <div className={styles.container}>
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
