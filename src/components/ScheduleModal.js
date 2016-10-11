import TimelineModal from './TimelineModal';
import { connect } from 'react-redux';
import { addItem, removeItem } from '../actions/ScheduleActions';

const ScheduleModal = props => (
  <TimelineModal {...props} title='Schedule Item'>
    <div>
      Children
    </div>
  </TimelineModal>
);

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item)),
  removeItem: itemId => dispatch(removeItem(itemId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleModal);
