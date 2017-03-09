import {connect} from 'react-redux'
import EmployeeTitle from './EmployeeTitle'

/** An EmployeeTitle component that gets its imployee from the Redux store **/

const mapStateToProps = state => ({
	employee: state.user
})

export default connect(mapStateToProps)(EmployeeTitle)
