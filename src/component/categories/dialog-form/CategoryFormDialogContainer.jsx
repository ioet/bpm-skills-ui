import { connect } from 'react-redux';
import { isCategoryDialogFormOpen } from '../edit/EditCategorySelector';
import { CategoryFormDialogConstants } from './CategoryFormDialogConstants';
import { handleCloseFormDialog } from '../edit/EditCategoryActions';
import BpmDialog from '../../bpm-dialog/BpmDialog';

const mapStateToProps = state => ({
  open: isCategoryDialogFormOpen(state),
  dialogTitle: CategoryFormDialogConstants.TITLE,
  positiveButtonLabel: CategoryFormDialogConstants.SAVE,
});

const mapDispatchToProps = dispatch => ({
  handleClose: (confirmed) => {
    dispatch(handleCloseFormDialog(confirmed));
  },
});

const CreateCategoryDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BpmDialog);

export default CreateCategoryDialogContainer;
