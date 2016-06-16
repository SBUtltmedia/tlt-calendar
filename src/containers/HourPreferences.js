import React, { PropTypes, Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend';
import VisibleCalendar from '../components/VisibleCalendar';
import ChipBank from '../components/ChipBank';

@DragDropContext(HTML5Backend)
export default class HourPreferences extends Component {
  render() {
    return <div>
      <VisibleCalendar />
      <ChipBank />
    </div>;
  }
}
