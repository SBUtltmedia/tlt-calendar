import { Button, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { showSlots, hideSlots } from '../actions/UiActions';
import styles from './SlotsOverlayToggle.scss';

const ToggleButton = ({on, onClick, children}) => (
  on ? <Button onClick={onClick} active>{children}</Button> : <Button onClick={onClick}>{children}</Button>
);

const SlotsOverlayToggle = ({slotsShowing, showSlots, hideSlots}) => (
  <ButtonGroup className={styles.container}>
    <ToggleButton on={slotsShowing} onClick={showSlots}>Show slots</ToggleButton>
    <ToggleButton on={!slotsShowing} onClick={hideSlots}>Hide slots</ToggleButton>
  </ButtonGroup>
);

const mapStateToProps = state => ({
  slotsShowing: state.ui.slotsShowing
});

const mapDispatchToProps = dispatch => ({
  showSlots: () => dispatch(showSlots()),
  hideSlots: () => dispatch(hideSlots())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SlotsOverlayToggle);
