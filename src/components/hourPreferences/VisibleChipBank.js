import {getNumOpenChipSets} from '../../utils/hourPreferences';
import ChipBank from './ChipBank';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  const {chipsPlaced} = state.hourPreferences;
  return {
    chipsPlaced: chipsPlaced,
    numOpenSets: getNumOpenChipSets(chipsPlaced)
  };
};

export default connect(
  mapStateToProps,
  {}
)(ChipBank);
