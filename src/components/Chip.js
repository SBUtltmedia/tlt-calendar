import { HOUR } from '../constants/Constants';

export function getFullChipImage(value) {
  return require(`../../img/chips/${value}.png`);
}

export default ({value, minute, duration=HOUR}) => (
  <img style={{float: minute === 30 ? 'right' : 'left'}}
  src={require(`../../img/chips/${value + (duration === HOUR ? '' : ('half' + (minute === 30 ? '1' : '2' )))}.png`)} />
);
