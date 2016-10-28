import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import HoursSettings from '../components/HoursSettings';
import LocationOrder from '../components/LocationOrder';
import Title from '../components/Title';
import CalendarInfoBox from '../components/CalendarInfoBox';
import EmployeeIcon from '../components/EmployeeIcon';
import styles from './HourPreferences.scss';
import HourPreferencesTimeline from '../components/HourPreferencesTimeline';
import { setEmployee } from '../actions/EmployeesActions';
import Joyride from 'react-joyride';
import { autobind } from 'core-decorators';

class HourPreferences extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,  // Params from URL
    isAdmin: PropTypes.bool
  }

  constructor(props) {
    super(props);

    this.state = {
      joyrideOverlay: true,
      joyrideType: 'continuous',
      ready: false,
      steps: []
    };
  }

  componentWillMount() {
    const {setEmployee, params:{netId}} = this.props;
    setEmployee(netId);
  }

  @autobind
  addSteps(steps) {
    const joyride = this.joyride;
    let newSteps = steps;

    if (!Array.isArray(newSteps)) {
      newSteps = [newSteps];
    }

    if (!newSteps.length) {
      return;
    }

    this.setState(currentState => {
      currentState.steps = currentState.steps.concat(joyride.parseSteps(newSteps));
      return currentState;
    });
  }

  @autobind
  addTooltip(data) {
    this.joyride.addTooltip(data);
  }

  callback(data) {
    console.log('%ccallback', 'color: #47AAAC; font-weight: bold; font-size: 13px;'); //eslint-disable-line no-console
    console.log(data); //eslint-disable-line no-console
  }

  @autobind
  onClickSwitch(e) {
    e.preventDefault();
    const el = e.currentTarget;
    const state = {};

    if (el.dataset.key === 'joyrideType') {
      this.joyride.reset();

      setTimeout(() => {
        this.joyride.start();
      }, 300);

      state.joyrideType = e.currentTarget.dataset.type;
    }

    if (el.dataset.key === 'joyrideOverlay') {
      state.joyrideOverlay = el.dataset.type === 'active';
    }

    this.setState(state);
  }

  render() {
    const {employee, isAdmin, removeItem} = this.props;
    return <div className={styles.container}>
      <Joyride ref={c => (this.joyride = c)} steps={this.state.steps} debug={true} />
      <Title icon={employee ? <EmployeeIcon employee={employee} /> : null}
        name={employee ? (employee.firstName || '') + ' ' + (employee.lastName || '') : ''} />
      <HourPreferencesTimeline
        disabled={isAdmin}
        joyrideType={this.state.joyrideType}
        joyrideOverlay={this.state.joyrideOverlay}
        onClickSwitch={this.onClickSwitch}
        addSteps={this.addSteps}
        addTooltip={this.addTooltip} />
      <div className="controls">
        <div className="hours-settings"><HoursSettings disabled={isAdmin} /></div>
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

export default connect(
  mapStateToProps,
  { setEmployee }
)(HourPreferences);
