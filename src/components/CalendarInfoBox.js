import { connect } from 'react-redux';
import styles from './CalendarInfoBox.scss';
import { STUDENT_CELL, ADMIN_CELL, EMPLOYEE, ACTION } from '../constants/InfoBoxTypes';
import { DAYS } from '../constants/Settings';
import { getHourLabel, hourPlus1 } from '../utils/time';
import { HOUR, HALF_HOUR } from '../constants/Constants';
import _ from 'lodash';

function renderCellItemsSection(items, heading, renderFn, alwaysRender=false) {
	if (_.isEmpty(items) && !alwaysRender) {
		return '';
	} else {
		return <div>
	 		{heading}
	 		<ul>
	 			{_.map(items, (item, i) => <li key={i}>{renderFn(item)}</li>)}
	 		</ul>
	 	</div>
	}
}

function renderCellItems(day, hour, items, renderFn) {
	const dayName = DAYS[day];
	const startHourString = getHourLabel(hour);
	const endHourString = getHourLabel(hourPlus1(hour));
	const fullItems = _.filter(items, item => item.duration === HOUR);
	const halfItems1 = _.filter(items, item => item.duration === HALF_HOUR && item.minute === 0);
 	const halfItems2 = _.filter(items, item => item.duration === HALF_HOUR && item.minute === 30);
 	const alwaysRender = _.isEmpty(fullItems) && _.isEmpty(halfItems1) && _.isEmpty(halfItems2);
 	return <div>
 		{renderCellItemsSection(fullItems, dayName + ' ' + startHourString + ' - ' + endHourString, renderFn, alwaysRender)}
 		{renderCellItemsSection(halfItems1, dayName + ' ' + startHourString + ' - ' + startHourString + ":30", renderFn)}
 		{renderCellItemsSection(halfItems2, dayName + ' ' + startHourString + ':30 - ' + endHourString, renderFn)}
 	</div>;
}

function renderCell(day, hour, items, itemRenderFn) {
	return <div className="cell">
		{ renderCellItems(day, hour, items, itemRenderFn) }
	</div>;
}

const StudentCell = ({day, hour, cellItems}) => renderCell(day, hour, cellItems, item => `Rank: ${item.value}`);

const AdminCell = ({day, hour, cellItems}) => renderCell(day, hour, cellItems, item => item.value.name);

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
