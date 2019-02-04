import { connect } from 'react-redux';
import { SkillFormDialogConstants } from './SkillFormDialogConstants';
import { isSkillDialogFormOpen } from '../edit/EditSkillSelector';
import BpmDialog from '../../bpm-dialog/BpmDialog';
import { handleCloseFormDialog } from '../edit/EditSkillActions';

const mapStateToProps = state => ({
  open: isSkillDialogFormOpen(state),
  dialogTitle: SkillFormDialogConstants.TITLE,
  positiveButtonLabel: SkillFormDialogConstants.SAVE,
});

const mapDispatchToProps = dispatch => ({
  handleClose: (confirmed) => {
    dispatch(handleCloseFormDialog(confirmed));
  },
});

const CreateSkillDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BpmDialog);

export default CreateSkillDialogContainer;
