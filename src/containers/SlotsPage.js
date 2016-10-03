import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SlotsTimeline from '../components/SlotsTimeline';
import CalendarInfoBox from '../components/CalendarInfoBox';
import Title from '../components/Title';
import LocationIcon from '../components/LocationIcon';
import styles from './SlotsPage.scss';
import _ from 'lodash';
import { fetchSlots, removeItem } from '../actions/SlotsActions';

class SchedulePage extends Component {
	static propTypes = {
		isAdmin: PropTypes.bool
	}

	componentDidMount() {
		const {fetchSlots} = this.props;
		fetchSlots();
	}

	render () {
		const {loc, isAdmin, removeItem} = this.props;
		return <div className={styles.container}>
			<Title icon={loc ? <LocationIcon id={loc.id} /> : null} name={loc ? loc.title : ''} />
			<SlotsTimeline disabled={!isAdmin} />
      <div className="controls">
        <div className="info"><CalendarInfoBox /></div>
      </div>
		</div>;
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		loc: _.find(state.locations, loc => loc.id === parseInt(ownProps.params.location)),
		isAdmin: state.user.isAdmin
	}
};

const mapDispatchToProps = (dispatch, ownProps) => ({
	fetchSlots: () => dispatch(fetchSlots(parseInt(ownProps.params.location))),
  removeItem: item => dispatch(removeItem(item))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchedulePage);
