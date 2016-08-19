import { Component } from 'react';
import { connect } from 'react-redux';
import { FormControl } from 'react-bootstrap';
import ReserveIcon from './ReserveIcon';
import EmployeeCalendarIcon from './EmployeeCalendarIcon';
import styles from './ScheduleBank.scss';
import Dimensions from 'react-dimensions';
import { HOUR, HALF_HOUR } from '../constants/Constants';

const ICON_MARGIN = 3;
const WHOLE_COLS = 7;
const COLS = WHOLE_COLS + 0.5;  // Show half an extra column

function filterEmployees(employees, search) {
	return _.filter(employees, emp => emp.name.toLowerCase().includes(search.toLowerCase()));
}

class ScheduleBank extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: ''
		}
	}
	render() {
		const {containerWidth, employees, disabled} = this.props;
    const iconSize = Math.round((containerWidth - ((COLS - 1) * ICON_MARGIN * 2)) / COLS);
		return <div className={styles.container}>
			<FormControl type="text" className='search' placeholder="Search"
				onChange={e => this.setState({search: e.target.value})} />
			<div className="bank-row">
				<div style={{margin: ICON_MARGIN}}>
					<ReserveIcon size={iconSize} disabled={disabled} duration={HOUR} />
				</div>
				{_.map(filterEmployees(employees, this.state.search), (employee, i) =>
					<div key={i} style={{margin: ICON_MARGIN}}>
						<EmployeeCalendarIcon size={iconSize} value={employee} disabled={disabled} duration={HOUR} />
					</div>)}
			</div>
		</div>;
	}
}

const mapStateToProps = state => ({
	employees: state.employees
});

export default connect(
  mapStateToProps,
  {}
)(Dimensions()(ScheduleBank));
