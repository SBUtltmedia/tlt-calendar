import {HOUR} from '../constants/Constants';

export default ({value, minutes, duration=HOUR}) => (
  <img style={{float: minutes === 30 ? 'right' : 'left'}}
  src={require(`../../img/chips/${value + (duration === HOUR ? '' : ('half' + (minutes === 30 ? '1' : '2' )))}.png`)} />
);
