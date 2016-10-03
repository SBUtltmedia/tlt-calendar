import styles from './AddItemPopup.scss';
import Modal from 'react-modal';
import { Component } from 'react';
import Selectivity from 'selectivity/react';
import 'selectivity/styles/selectivity-react.min.css';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

export default class AddItemPopup extends Component {
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
    return <Modal isOpen={this.state.modalIsOpen} className={styles.container} onRequestClose={() => this.close()}>
      <h2>Add Employee Shift</h2>
      <div className="field">
        <label>WHEN</label>
        <Datetime className='datetime' defaultValue={new Date()} />
        -
        <Datetime className='datetime' defaultValue={new Date()} />
      </div>
      <div className="field">
        <label className="where">WHERE</label>
        <Selectivity.React className="select" items={['ones', 'two']} />
      </div>
      <div className="field">
        <label className="where">WHO</label>
        <Selectivity.React className="select" items={['ones', 'two']} />
      </div>
      <button onClick={() => this.close()}>Cancel</button>
    </Modal>;
  }
}
