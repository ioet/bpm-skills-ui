import { connect } from 'react-redux';
import { startOrEndCreateCategory } from '../../actions';
import FloatingActionButton from '../presentational/FloatingActionButton';
import { getFabIcon, getFabTooltip } from '../../selectors';

const mapStateToProps = state => ({
  tooltip: getFabTooltip(state),
  icon: getFabIcon(state),
});

const mapDispatchToProps = dispatch => ({
  createCategory: () => {
    dispatch(startOrEndCreateCategory());
  },
});

const FloatingActionButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FloatingActionButton);

export default FloatingActionButtonContainer;
