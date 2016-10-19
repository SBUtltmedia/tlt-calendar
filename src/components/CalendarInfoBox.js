import { connect } from 'react-redux';
import styles from './CalendarInfoBox.scss';
import { STUDENT_CELL, SLOT_CELL, ADMIN_SCHEDULE_CELL, EMPLOYEE, ACTION } from '../constants/InfoBoxTypes';
import { LONG_DAYS } from '../constants/Settings';
import _ from 'lodash';

function renderItem(item) {
	if (item.name) {
		return item.name;
	}
	else if (item.firstName && item.lastName) {
		return item.firstName + ' ' + item.lastName;
	}
	else {
		return item;
	}
}

function renderCellItemsSection(items, heading, alwaysRender=false) {
	if (_.isEmpty(items) && !alwaysRender) {
		return '';
	} else {
		return <div>
	 		{heading}
	 		<ul>
	 			{_.map(items, (item, i) => _.isArray(item.value) ?
					_.map(item.value, (value, v) => <li key={v}>{renderItem(value)}</li>) :
					<li key={i}>{renderItem(item.value)}</li>)}
	 		</ul>
	 	</div>
	}
}

const Employee = data => (
	<div className="employee">
		Employee
	</div>
);

const Action = ({name, description, img}) => (
	<div className="action">
		<div className="title">{name}</div>
		<div className="description">{description}</div>
		<div className="icon">{img}</div>
	</div>
);

function renderTemplate(infoType, data) {
	switch(infoType) {
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
