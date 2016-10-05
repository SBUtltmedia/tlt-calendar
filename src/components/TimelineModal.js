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

  render() {
    const {children, title, locations, employees, startTime, endTime, location} = this.props;
    return <Modal
    isOpen={this.state.modalIsOpen}
    className={styles.container}
    onRequestClose={() => this.close()}>
      <h3 className="title">{title}</h3>
      <div className="field">
        <label>WHEN</label>
        <Datetime className='datetime' defaultValue={startTime} />
        -
        <Datetime className='datetime' defaultValue={endTime} />
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
      {children}
      <div className="buttons">
        <button className='btn' onClick={() => this.close()}>Cancel</button>
        <button className='btn btn-primary' onClick={() => this.close()}>Save</button>
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
  children: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  startTime: PropTypes.object,
  endTime: PropTypes.object,
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
)(TimelineModal);
