import styles from './TimelineModal.scss';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { Component, PropTypes } from 'react';
import _ from 'lodash';
import Selectivity from 'selectivity/react';
import 'selectivity/styles/selectivity-react.min.css';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {addItem, removeItem} from '../actions/TimelineActions';

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
    const {addItem, useLocation, useEmployee, usePreference} = this.props;
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
    else if (usePreference) {
      console.log(this.preferenceInput);
      item.value = 5 - this.preferenceInput.state.bounds[1];
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
    const {children, title, locations, employees, itemId, startTime, endTime, location, useLocation, useEmployee, usePreference} = this.props;
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
      {usePreference ?
        <div className="field preference">
          <label>PREFERENCE</label>
          <Slider className='rank-slider' ref={(ref) => this.preferenceInput = ref} min={1} max={4}
                marks={{1: 'Least prefered', 2: '3', 3: '2', 4: 'Most prefered'}} />
          </div> : ''}
      <div className="buttons">
        <button className='btn' onClick={() => this.close()}>Cancel</button>
        {itemId ? <button className='btn btn-danger' onClick={() => this.remove(itemId)}>Delete</button> : ''}
        <button className='btn btn-primary' onClick={() => this.save()}>Save</button>
      </div>
    </Modal>;
  }
}

TimelineModal.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.object,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  itemId: PropTypes.number,  // Only for existing item
  startTime: PropTypes.object,
  endTime: PropTypes.object,
  location: PropTypes.number,
  onClose: PropTypes.func
};

const mapStateToProps = state => ({
  locations: state.locations,
  employees: state.employees
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addItem: item => dispatch(addItem(ownProps.type, item)),
  removeItem: item => dispatch(removeItem(ownProps.type, item)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelineModal);
