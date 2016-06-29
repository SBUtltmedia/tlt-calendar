import { connect } from 'react-redux';
import styles from './CalendarInfoBox.scss';
import { STUDENT_CELL, ADMIN_CELL, EMPLOYEE, ACTION } from '../constants/InfoBoxTypes';
import { DAYS } from '../constants/Settings';
import { getHourLabel, hourPlus1 } from '../utils/time';

const StudentCell = ({day, hour}) => (
	<div className="cell">
		<div>
			<span className="label">Time slot:</span>
			{DAYS[day]} {getHourLabel(hour)}-{getHourLabel(hourPlus1(hour))}
		</div>
		<div>
			<span className="label">Preference rank:</span>
			-
		</div>
	</div>
);

const AdminCell = ({day, hour}) => (
	<div className="cell">
		<div>
			<span className="label">Time slot:</span>
			{DAYS[day]} {getHourLabel(hour)}-{getHourLabel(hourPlus1(hour))}
		</div>
		<div>
			<span className="label">Employee:</span>
			-
		</div>
	</div>
);

const Employee = data => (
	<div className="employee">
		Employee
	</div>
);

const Action = ({name, description}) => (
	<div className="action">
		<div className="title">{name}</div>
		<div className="description">{description}</div>
	</div>
);

function renderTemplate(infoType, data) {
	switch(infoType) {
		case STUDENT_CELL: return StudentCell(data);
		case ADMIN_CELL: return AdminCell(data);
		case EMPLOYEE: return Employee(data);
		case ACTION: return Action(data);
		default: return '';
	}
}

const CalendarInfoBox = ({infoType, data}) => (
	<div className={styles.container}>
		{renderTemplate(infoType, data)}
	</div>
);

export default connect(
  state => state.calendarInfoBox,
  {}
)(CalendarInfoBox);
