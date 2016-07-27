import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import StudentCalendarGrid from '../components/hourPreferences/StudentCalendarGrid';
import HoursSettings from '../components/hourPreferences/HoursSettings';
import ChipBank from '../components/hourPreferences/ChipBank';
import Trash from '../components/Trash';
import LocationOrder from '../components/hourPreferences/LocationOrder';
import CalendarInfoBox from '../components/CalendarInfoBox';
import EmployeeIcon from '../components/EmployeeIcon';
import { CHIP } from '../constants/DraggableTypes';
import { fetchPreferences, removeItem } from '../actions/HourPreferencesActions';
import styles from './HourPreferences.scss';

@DragDropContext(HTML5Backend)
class HourPreferences extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,  // Params from URL
    isAdmin: PropTypes.bool
  }

  componentWillMount() {
    this.props.fetchPreferences();
  }

  render() {
    const {employee, isAdmin, removeItem} = this.props;
    return <div className={styles.container}>
      <div className="header">
        { employee ? <div className="employee-icon"><EmployeeIcon employee={employee} /></div> : '' }
        <span className="name">{employee ? employee.name : ''}</span>
      </div>
      <StudentCalendarGrid disabled={isAdmin} />
      <div className="controls">
        <div className="hours-settings"><HoursSettings disabled={isAdmin} /></div>
        <div className="chip-bank"><ChipBank disabled={isAdmin} /></div>
        <div className="trash"><Trash disabled={!isAdmin} itemTypes={[CHIP]} removeItem={removeItem} /></div>
        <div className="location-order"><LocationOrder disabled={isAdmin} /></div>
        <div className="info"><CalendarInfoBox /></div>
      </div>
    </div>;
  }
}

const mapStateToProps = state => ({
	employee: state.hourPreferences.employee,
  isAdmin: state.user.isAdmin  // user could be null but they should then be redirected to login anyway
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	fetchPreferences: () => dispatch(fetchPreferences(ownProps.params.id)),
  removeItem: item => dispatch(removeItem(item))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HourPreferences);
