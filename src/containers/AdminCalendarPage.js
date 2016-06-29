import { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import AdminCalendarGrid from '../components/admin/AdminCalendarGrid';
import AdminBank from '../components/admin/AdminBank';
import AdminCalendarTrash from '../components/admin/AdminCalendarTrash';
import AdminCalendarInfoBox from '../components/admin/AdminCalendarInfoBox';
import styles from './AdminCalendarPage.scss';

@DragDropContext(HTML5Backend)
export default class AdminCalendarPage extends Component {
	render () {
		return <div className={styles.container}>
			<AdminCalendarGrid />
      <div className="controls">
        <div className="bank"><AdminBank /></div>
        <div className="trash"><AdminCalendarTrash /></div>
        <div className="info"><AdminCalendarInfoBox /></div>
      </div>
		</div>;
	}
}