import { Component } from 'react';
import Slot from './Slot';
import styles from './SlotsBank.scss';
import Dimensions from 'react-dimensions';
import { TWO_HOURS, HOUR, HALF_HOUR } from '../../constants/Constants';

class SlotsBank extends Component {
  render() {
    const {containerWidth, containerHeight} = this.props;
    const oneHourSize = Math.min(Math.floor(containerWidth / 4), Math.floor(containerHeight / 4));
    console.log('OHS', oneHourSize);
    return <div className={styles.container}>
      <Slot value="2hr" duration={TWO_HOURS} size={oneHourSize} />
      <Slot value="1hr" duration={HOUR} size={oneHourSize} />
    </div>
  }
}

export default Dimensions()(SlotsBank);
