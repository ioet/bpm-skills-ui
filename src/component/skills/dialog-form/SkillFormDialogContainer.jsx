import React from 'react';
import { connect } from 'react-redux';
import BpmTextFieldContainer from '../../text-field/BpmTextFieldContainer';
import { SkillFormDialogConstants, SkillFormDialogLabels, SkillFormDialogNames } from './SkillFormDialogConstants';
import { getCurrentEditSkill, isSkillDialogFormOpen } from '../edit/EditSkillSelector';
import BpmDialog from '../../bpm-dialog/BpmDialog';
import { handleCloseFormDialog, setSkillEditData } from '../edit/EditSkillActions';
import CategorySelectContainer from '../category-select/CategorySelectContainer';

const getChildren = (state) => {
  const skill = getCurrentEditSkill(state);
  return (
    <div>
      <BpmTextFieldContainer
        autoFocus
        name={SkillFormDialogNames.SKILL_NAME}
        label={SkillFormDialogLabels.SKILL_NAME_LABEL}
        value={skill.name}
        onInputChange={setSkillEditData}
      />
      <BpmTextFieldContainer
        name={SkillFormDialogNames.SKILL_LABEL}
        label={SkillFormDialogLabels.SKILL_LABEL_LABEL}
        value={skill.label}
        onInputChange={setSkillEditData}
      />
      <CategorySelectContainer onCategoryChange={setSkillEditData} />
      <BpmTextFieldContainer
        name={SkillFormDialogNames.SKILL_BUSINESS_VALUE}
        label={SkillFormDialogLabels.SKILL_BUSINESS_VALUE_LABEL}
        value={skill.business_value}
        onInputChange={setSkillEditData}
      />
      <BpmTextFieldContainer
        name={SkillFormDialogNames.SKILL_PREDICTIVE_VALUE}
        label={SkillFormDialogLabels.SKILL_PREDICTIVE_VALUE_LABEL}
        value={skill.predictive_value}
        onInputChange={setSkillEditData}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  open: isSkillDialogFormOpen(state),
  children: getChildren(state),
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
