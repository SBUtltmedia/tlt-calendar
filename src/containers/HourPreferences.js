import React, { PropTypes, Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import VisibleCalendar from '../components/VisibleCalendar';
import HoursSettings from '../components/HoursSettings';
import ChipBank from '../components/ChipBank';
import LocationOrder from '../components/LocationOrder';
import styles from './HourPreferences.scss';

@DragDropContext(HTML5Backend)
export default class HourPreferences extends Component {
  render() {
    return <div className={styles.container}>
      <VisibleCalendar />
      <div className="controls">
        <div className="hours-settings"><HoursSettings /></div>
        <div className="chip-bank"><ChipBank /></div>
        <div className="location-order"><LocationOrder /></div>
      </div>
    </div>;
  }
}
