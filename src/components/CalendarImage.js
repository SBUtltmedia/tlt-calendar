import { HOUR } from '../constants/Constants';
const FORMAT = 'png';

export default ({baseImgSrc, minute, duration=HOUR}) => (
  <img style={{float: minute === 30 ? 'right' : 'left'}}
  src={require(`img/${baseImgSrc}${(duration === HOUR ? '' : ('half' + (minute === 30 ? '1' : '2' )))}.${FORMAT}`)} />
);
