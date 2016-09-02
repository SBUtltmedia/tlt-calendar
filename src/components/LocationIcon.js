import styles from './LocationIcon.scss';

const req = require.context('img/locations', true, /^\.\/.*$/);
const getImgSrc = value => req(`./${value}.jpg`);

export default ({id}) => (
  <img className={styles.icon} src={getImgSrc(id)} />
);
