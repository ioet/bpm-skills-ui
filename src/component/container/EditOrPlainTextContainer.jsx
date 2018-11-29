import { connect } from 'react-redux';
import { editUpdateOrCreateCategory, setCategoryEditData } from '../../actions';
import EditOrPlainText from '../presentational/EditOrPlainText';
import { getEditId, getInputError } from '../../selectors';

const mapStateToProps = (state, ownProps) => ({
  editId: getEditId(state),
  inputError: getInputError(state, ownProps),
  categoryId: ownProps.categoryId,
  value: ownProps.value,
  name: ownProps.name,
  label: ownProps.label,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onCategoryEdit: () => {
    dispatch(editUpdateOrCreateCategory(ownProps.categoryId));
  },
  onChange: (event) => {
    dispatch(setCategoryEditData(event.target.name, event.target.value));
  },
});

const EditOrPlainTextContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditOrPlainText);

export default EditOrPlainTextContainer;
