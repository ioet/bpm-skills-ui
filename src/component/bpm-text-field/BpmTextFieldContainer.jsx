import { connect } from 'react-redux';
import BpmTextField from './BpmTextField';
import { getInputError } from './BpmTextFieldSelector';

const mapStateToProps = (state, ownProps) => ({
  name: ownProps.name,
  label: ownProps.label,
  value: ownProps.value,
  error: getInputError(state, ownProps.name),
  helperText: ownProps.helperText,
  type: ownProps.type,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: (event) => {
    dispatch(ownProps.onInputChange(event.target.name, event.target.value));
  },
});

const BpmTextFieldContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BpmTextField);

export default BpmTextFieldContainer;
