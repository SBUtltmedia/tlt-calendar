import styles from './AddItemPopup.scss';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { Component } from 'react';
import _ from 'lodash';
import Selectivity from 'selectivity/react';
import 'selectivity/styles/selectivity-react.min.css';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

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
    this.setState({modalIsOpen: false})
  }

  render() {
    const {locations, employees} = this.props;
    return <Modal isOpen={this.state.modalIsOpen} className={styles.container} onRequestClose={() => this.close()}>
      <h2>Add Employee Shift</h2>
      <div className="field">
        <label>WHEN</label>
        <Datetime className='datetime' defaultValue={new Date()} />
        -
        <Datetime className='datetime' defaultValue={new Date()} />
      </div>
      <div className="field">
        <label>WHERE</label>
        <Selectivity.React className="select where" items={_.map(locations, loc => loc.title)} />
      </div>
      <div className="field">
        <label>WHO</label>
        <Selectivity.React className="select who" items={_.map(employees, emp => emp.firstName + ' ' + emp.lastName)} />
      </div>
      <div>
        <button onClick={() => this.close()}>Cancel</button>
        <button onClick={() => this.close()}>Save</button>
      </div>
    </Modal>;
  }
}

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
