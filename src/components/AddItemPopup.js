import styles from './AddItemPopup.scss';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { Component, PropTypes } from 'react';
import _ from 'lodash';
import Selectivity from 'selectivity/react';
import 'selectivity/styles/selectivity-react.min.css';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

const ONE_HOUR_IN_MS = 3600000;

class AddItemPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: props.open
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({modalIsOpen: newProps.open});
  }

  close() {
    this.setState({modalIsOpen: false});
    this.props.onClose();
  }

  render() {
    const {locations, employees, time, location} = this.props;
    return <Modal isOpen={this.state.modalIsOpen} className={styles.container} onRequestClose={() => this.close()}>
      <h3 className="title">Add Employee Shift</h3>
      <div className="field">
        <label>WHEN</label>
        <Datetime className='datetime' defaultValue={new Date(time)} />
        -
        <Datetime className='datetime' defaultValue={new Date(time + ONE_HOUR_IN_MS)} />
      </div>
      <div className="field">
        <label>WHERE</label>
        <Selectivity.React className="select where" defaultValue={location}
        items={_.map(locations, loc => ({id: loc.id, text: loc.title}))} />
      </div>
      <div className="field">
        <label>WHO</label>
        <Selectivity.React className="select who"
        items={_.map(employees, emp => ({id: emp.netId, text: emp.firstName + ' ' + emp.lastName}))} />
      </div>
      <div className="buttons">
        <button className='btn' onClick={() => this.close()}>Cancel</button>
        <button className='btn btn-primary' onClick={() => this.close()}>Save</button>
      </div>
    </Modal>;
  }
}

AddItemPopup.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  time: PropTypes.number,
  location: PropTypes.number,
  onClose: PropTypes.func
};

const mapStateToProps = state => ({
  locations: state.locations,
  employees: state.employees
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddItemPopup);
