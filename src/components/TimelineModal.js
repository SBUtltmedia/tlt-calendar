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
import {addItem, removeItem, updateItem} from '../actions/TimelineActions';
import {HOUR_PREFERENCE_DESCRIPTIONS} from '../constants/Settings';
import {RESERVED} from '../constants/Constants';

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
    const {addItem, updateItem, useLocation, useEmployee, usePreference, item} = this.props;

    console.log(this.props);

    const newItem = {
      start_time: this.startTimeInput.state.selectedDate,
      end_time: this.endTimeInput.state.selectedDate
    };
    if (useLocation) {
      newItem.group = this.whereInput.getData().id;
    }
    if (useEmployee) {
      const value = this.whoInput.getData();
      if (value.id === RESERVED) {
        newItem.value = RESERVED;
      }
      else {
        newItem.value = _.omit(this.whoInput.getData(), ['id', 'text']);
      }
    }
    else if (usePreference) {
      newItem.value = 5 - this.preferenceInput.state.bounds[1];
    }
    if (item.id) {  // If item exists already
      updateItem(item.id, newItem);
    }
    else {
      addItem(newItem);
    }
    this.close();
  }

  remove(item) {
    const {removeItem} = this.props;
    removeItem(item.id);
    this.close();
  }

  render() {
    const {children, title, locations, employees, item, useLocation, useEmployee, usePreference} = this.props;
    return item ? <Modal
    isOpen={this.state.modalIsOpen}
    className={styles.container}
    onRequestClose={() => this.close()}>
      <h3 className="title">{title || 'Title'}</h3>
      <div className="field">
        <label>WHEN</label>
        <Datetime className='datetime' defaultValue={item.start_time} ref={(ref) => this.startTimeInput = ref} />
        -
        <Datetime className='datetime' defaultValue={item.end_time} ref={(ref) => this.endTimeInput = ref} />
      </div>
      {useLocation ?
        <div className="field">
          <label>WHERE</label>
          <Selectivity.React className="select where" defaultValue={item.group}
              ref={(ref) => this.whereInput = ref}
              items={_.map(locations, loc => ({id: loc.id, text: loc.title}))} />
        </div> : ''}
      {useEmployee ?
        <div className="field">
          <label>WHO</label>
          <Selectivity.React className="select who" defaultValue={item.value ? (item.value.netId || RESERVED) : null}
              ref={(ref) => this.whoInput = ref}
              items={[{id: RESERVED, text: RESERVED},
                ..._.map(employees, emp => ({...emp, id: emp.netId, text: emp.firstName + ' ' + emp.lastName}))]} />
        </div> : ''}
      {usePreference ?
        <div className="field preference">
          <label>PREFERENCE</label>
          <Slider className='rank-slider' ref={(ref) => this.preferenceInput = ref}
                min={1} max={4} defaultValue={5 - item.value}
                marks={{1: HOUR_PREFERENCE_DESCRIPTIONS[3], 4: HOUR_PREFERENCE_DESCRIPTIONS[0]}} />
          </div> : ''}
      <div className="buttons">
        <button className='btn' onClick={() => this.close()}>Cancel</button>
        {item.id ? <button className='btn btn-danger' onClick={() => this.remove(item)}>Delete</button> : ''}
        <button className='btn btn-primary' onClick={() => this.save()}>Save</button>
      </div>
    </Modal> : <div></div>;
  }
}

TimelineModal.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.object,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  item: PropTypes.object,
  startTime: PropTypes.object,
  endTime: PropTypes.object,
  onClose: PropTypes.func
};

const mapStateToProps = state => ({
  locations: state.locations,
  employees: state.employees
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addItem: item => dispatch(addItem(ownProps.type, item)),
  removeItem: item => dispatch(removeItem(ownProps.type, item)),
  updateItem: (itemId, newItemData) => dispatch(updateItem(ownProps.type, itemId, newItemData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelineModal);
