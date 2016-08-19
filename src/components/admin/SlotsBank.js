import { Component } from 'react';
import Slot from './Slot';
import styles from './SlotsBank.scss';
import Dimensions from 'react-dimensions';
import { EIGHT_HOURS, FOUR_HOURS, TWO_HOURS, HOUR, HALF_HOUR } from '../../constants/Constants';

class SlotsBank extends Component {
  render() {
    const {containerWidth, containerHeight} = this.props;
    const oneHourSize = Math.min(Math.floor(containerWidth / 4), Math.floor(containerHeight / 4));
    return <div className={styles.container}>
      <Slot duration={EIGHT_HOURS} size={oneHourSize} />
      <Slot duration={FOUR_HOURS} size={oneHourSize} />
      <Slot duration={TWO_HOURS} size={oneHourSize} />
      <Slot duration={HOUR} size={oneHourSize} />
    </div>
  }
}

export default Dimensions()(SlotsBank);
