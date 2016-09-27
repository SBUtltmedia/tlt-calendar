import styles from './AddItemPopup.scss';
import Modal from 'react-modal';
import { Component } from 'react';
import Selectivity from 'selectivity/react';
import 'selectivity/styles/selectivity-react.min.css';

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

  render() {
      return <Modal isOpen={this.state.modalIsOpen} className={styles.container}>
        <h2>Add Employee Shift</h2>
        <div><label>WHEN</label><input type="text" readOnly onClick={()=>console.log("HERE")}/></div>
        <div><label className="where">WHERE</label><Selectivity.React items={['ones', 'two']} /></div>
        <button onClick={() => this.setState({modalIsOpen: false})}>Cancel</button>
      </Modal>;
  }
}
