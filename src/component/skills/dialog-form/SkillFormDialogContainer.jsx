import React from 'react';
import { connect } from 'react-redux';
import BpmTextFieldContainer from '../../text-field/BpmTextFieldContainer';
import { SkillFormDialogConstants, SkillFormDialogLabels, SkillFormDialogNames } from './SkillFormDialogConstants';
import { getCurrentEditSkill, isSkillDialogFormOpen } from '../edit/EditSkillSelector';
import BpmDialog from './BpmDialog';
import { handleCloseFormDialog } from '../edit/EditSkillActions';

const getChildren = skill => (
  <div>
    <BpmTextFieldContainer
      autoFocus
      name={SkillFormDialogNames.SKILL_NAME}
      label={SkillFormDialogLabels.SKILL_NAME_LABEL}
      value={skill.name}
    />
  </div>
);

const mapStateToProps = state => ({
  open: isSkillDialogFormOpen(state),
  children: getChildren(getCurrentEditSkill(state)),
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
