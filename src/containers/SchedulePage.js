import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './SchedulePage.scss';
import SpreadsheetDashboard from './SpreadsheetDashboard';
import _ from 'lodash';

class SchedulePage extends Component {
	static propTypes = {
		isAdmin: PropTypes.bool
	}

	render () {
		const {loc, isAdmin, removeItem} = this.props;
		return <div className={styles.container}>
      <div className="controls">
				<SpreadsheetDashboard />
      </div>
		</div>;
	}
}

const mapStateToProps = (state, ownProps) => {
	const locationNumber = parseInt(ownProps.params.location);
	return {
		loc: _.find(state.locations, loc => loc.id === locationNumber),
		isAdmin: state.user.isAdmin || _.includes(state.user.managesSites, locationNumber)
	};
};

export default connect(
  mapStateToProps,
  {}
)(SchedulePage);
