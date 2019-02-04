import React from 'react';
import { connect } from 'react-redux';
import { SkillFormDialogConstants } from './SkillFormDialogConstants';
import { getCurrentEditSkill, isSkillDialogFormOpen } from '../edit/EditSkillSelector';
import BpmDialog from '../../bpm-dialog/BpmDialog';
import { handleCloseFormDialog } from '../edit/EditSkillActions';
import SkillFormDialogContent from './SkillFormDialogContent';

const mapStateToProps = state => ({
  open: isSkillDialogFormOpen(state),
  children: <SkillFormDialogContent skill={getCurrentEditSkill(state)} />,
  dialogTitle: SkillFormDialogConstants.TITLE,
  positiveButtonLabel: SkillFormDialogConstants.SAVE,
});

const mapDispatchToProps = dispatch => ({
  handleClose: (confirmed) => {
    dispatch(handleCloseFormDialog(confirmed));
  },
});

const CreateUserDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BpmDialog);

export default CreateUserDialogContainer;
