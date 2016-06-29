import { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import AdminCalendarGrid from '../components/admin/AdminCalendarGrid';
import AdminBank from '../components/admin/AdminBank';
import styles from './AdminCalendarPage.scss';

@DragDropContext(HTML5Backend)
export default class AdminCalendarPage extends Component {
	render () {
		return <div className={styles.container}>
			<AdminCalendarGrid />
      <div className="controls">
        <div className="bank"><AdminBank /></div>
      </div>
		</div>;
	}
}