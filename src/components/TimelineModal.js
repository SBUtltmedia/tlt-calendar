import styles from './TimelineModal.scss';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { Component, PropTypes } from 'react';
import _ from 'lodash';
import Selectivity from 'selectivity/react';
import 'selectivity/styles/selectivity-react.min.css';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

class TimelineModal extends Component {
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

  save() {
    const {addItem, useLocation, useEmployee} = this.props;
    const item = {
      start_time: this.startTimeInput.state.selectedDate,
      end_time: this.endTimeInput.state.selectedDate
    };
    if (useLocation) {
      item.group = this.whereInput.getData().id;
    }
    if (useEmployee) {
      item.value = this.whoInput.getData();
    }
    addItem(item);
    this.close();
  }

  remove(itemId) {
    const {removeItem} = this.props;
    removeItem(itemId);
    this.close();
  }

  render() {
    const {children, title, locations, employees, itemId, startTime, endTime, location, useLocation=false, useEmployee=false} = this.props;
    return <Modal
    isOpen={this.state.modalIsOpen}
    className={styles.container}
    onRequestClose={() => this.close()}>
      <h3 className="title">{title || 'Title'}</h3>
      <div className="field">
        <label>WHEN</label>
        <Datetime className='datetime' defaultValue={startTime} ref={(ref) => this.startTimeInput = ref} />
        -
        <Datetime className='datetime' defaultValue={endTime} ref={(ref) => this.endTimeInput = ref} />
      </div>
      {useLocation ?
        <div className="field">
          <label>WHERE</label>
          <Selectivity.React className="select where" defaultValue={location}
          ref={(ref) => this.whereInput = ref}
          items={_.map(locations, loc => ({id: loc.id, text: loc.title}))} />
        </div> : ''}
      {useEmployee ?
        <div className="field">
          <label>WHO</label>
          <Selectivity.React className="select who"
          ref={(ref) => this.whoInput = ref}
          items={_.map(employees, emp => ({...emp, id: emp.netId, text: emp.firstName + ' ' + emp.lastName}))} />
        </div> : ''}
      {children}
      <div className="buttons">
        <button className='btn' onClick={() => this.close()}>Cancel</button>
        {itemId ? <button className='btn btn-danger' onClick={() => this.remove(itemId)}>Delete</button> : ''}
        <button className='btn btn-primary' onClick={() => this.save()}>Save</button>
      </div>
    </Modal>;
  }
}

/*
{if (worksheet){
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
} else{
  /RANK
  <div className="field">
    <label>RANK</label>
    <something for rank>
  </div>
}}

*/

TimelineModal.propTypes = {
  children: PropTypes.object,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  itemId: PropTypes.number,  // Only for existing item
  startTime: PropTypes.object,
  endTime: PropTypes.object,
  location: PropTypes.number,
  onClose: PropTypes.func,
  addItem: PropTypes.func,
  removeItem: PropTypes.func
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
)(TimelineModal);
