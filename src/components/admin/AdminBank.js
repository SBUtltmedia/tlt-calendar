import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReserveIcon from '../ReserveIcon';
import StudentCalendarIcon from '../StudentCalendarIcon';
import styles from './AdminBank.scss';
import Dimensions from 'react-dimensions';

const ICON_MARGIN = 3;
const WHOLE_COLS = 7;
const COLS = WHOLE_COLS + 0.5;  // Show half an extra column

class AdminBank extends Component {
	render() {
		const {containerWidth, employees} = this.props;
    const iconSize = Math.round((containerWidth - ((COLS - 1) * ICON_MARGIN * 2)) / COLS);

		return <div className={styles.container}>
			<div className="bank-row">
				<div style={{margin: ICON_MARGIN}}>
					<ReserveIcon size={iconSize} />
				</div>
				{_.map(employees, (student, i) =>
					<div key={i} style={{margin: ICON_MARGIN}}>
						<StudentCalendarIcon size={iconSize} value={student} />
					</div>)}
			</div>
		</div>;
	}
}

const mapStateToProps = state => ({
	employees: state.employees
});

export default connect(
  mapStateToProps,
  {}
)(Dimensions()(AdminBank));
