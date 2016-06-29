import { Component } from 'react';
import ReserveIcon from './ReserveIcon';
import styles from './AdminBank.scss';
import Dimensions from 'react-dimensions';

class AdminBank extends Component {
	render() {
		return <div className={styles.container}>
			<ReserveIcon />
		</div>;
	}
}

export default Dimensions()(AdminBank);