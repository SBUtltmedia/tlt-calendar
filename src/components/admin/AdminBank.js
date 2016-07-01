import { Component } from 'react';
import ReserveIcon from '../ReserveIcon';
import StudentCalendarIcon from '../StudentCalendarIcon';
import styles from './AdminBank.scss';
import Dimensions from 'react-dimensions';
import { STUDENTS } from '../../constants/Settings';

const ICON_MARGIN = 3;
const WHOLE_COLS = 7;
const COLS = WHOLE_COLS + 0.5;  // Show half an extra column

class AdminBank extends Component {
	render() {
		const {containerWidth} = this.props;
    const iconSize = Math.round((containerWidth - ((COLS - 1) * ICON_MARGIN * 2)) / COLS);

		return <div className={styles.container}>
			<div className="row">
				<div style={{margin: ICON_MARGIN}}>
					<ReserveIcon size={iconSize} />
				</div>
				{_.map(STUDENTS, (student, i) =>
					<div key={i} style={{margin: ICON_MARGIN}}>
						<StudentCalendarIcon size={iconSize} {...student} />
					</div>)}
			</div>
		</div>;
	}
}

export default Dimensions()(AdminBank);
