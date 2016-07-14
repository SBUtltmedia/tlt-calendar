import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import StudentCalendarGrid from '../components/hourPreferences/StudentCalendarGrid';
import HoursSettings from '../components/hourPreferences/HoursSettings';
import ChipBank from '../components/hourPreferences/ChipBank';
import StudentCalendarTrash from '../components/hourPreferences/StudentCalendarTrash';
import LocationOrder from '../components/hourPreferences/LocationOrder';
import CalendarInfoBox from '../components/CalendarInfoBox';
import * as HourPreferencesActions from '../actions/HourPreferencesActions';
import styles from './HourPreferences.scss';

const req = require.context('img/users', true, /^\.\/.*$/);

@DragDropContext(HTML5Backend)
class HourPreferences extends Component {
  componentWillMount() {
    this.props.fetchPreferences();
  }
  render() {
    const {employee} = this.props;
    return <div className={styles.container}>
      <div className="header">
        <img src={employee ? req(`./${employee.icon}`) : ''} />
        <h1>{employee ? employee.name : ''}</h1>
      </div>
      <StudentCalendarGrid />
      <div className="controls">
        <div className="hours-settings"><HoursSettings /></div>
        <div className="chip-bank"><ChipBank /></div>
        <div className="trash"><StudentCalendarTrash /></div>
        <div className="location-order"><LocationOrder /></div>
        <div className="info"><CalendarInfoBox /></div>
      </div>
    </div>;
  }
}

const mapStateToProps = (state, ownProps) => {
	return {
		employee: state.hourPreferences.employee
	}
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const id = ownProps.params.id;
  const actions = bindActionCreators(HourPreferencesActions, dispatch);
  return {
		fetchPreferences: _.bind(actions.fetchPreferences, {}, id)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HourPreferences);
