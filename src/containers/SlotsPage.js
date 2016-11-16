import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './SlotsPage.scss';
import SpreadsheetDashboard from './SpreadsheetDashboard';
import _ from 'lodash';

class SchedulePage extends Component {
	static propTypes = {
		isAdmin: PropTypes.bool
	}

	render () {
		const {loc, isAdmin} = this.props;
		return <div className={styles.container}>

      <div className="controls">
				<SpreadsheetDashboard />
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

export default connect(
  mapStateToProps,
	{}
)(SchedulePage);
