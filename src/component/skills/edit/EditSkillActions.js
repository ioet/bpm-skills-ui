import { getCurrentEditSkill, isSkillCreation } from './EditSkillSelector';
import SkillsApi from '../../skillsApi/SkillsApi';
import { showMessage } from '../../bpm-notification/NotificationActions';
import { FAILED_TO_CREATE_SKILL } from '../create/NewSkillConstants';
import { addSkills, updateSkillInList } from '../SkillActions';
import { getSkillById } from '../SkillSelector';
import { removeAllInputErrors, setInputError } from '../../bpm-text-field/BpmTextFieldActions';
import { ErrorMessage, NotificationMessage, PromptMessage } from '../../bpm-notification/NotificationConstants';
import { SkillFormDialogNames } from '../dialog-form/SkillFormDialogConstants';

export const EditSkillAction = {
  EDIT_START: 'EDIT_START',
  EDIT_DATA: 'EDIT_DATA',
  EDIT_END: 'EDIT_END',
};

export const startCreateSkill = () => ({
  type: EditSkillAction.EDIT_START,
  skill: {},
});

export const startEditSkill = skill => ({
  type: EditSkillAction.EDIT_START,
  skill,
});

export const editSkill = skillId => (dispatch, getState) => {
  dispatch(startEditSkill(getSkillById(getState(), skillId)));
};

export const setSkillEditData = (field, value) => ({
  type: EditSkillAction.EDIT_DATA,
  field,
  value,
});

export const stopEditSkill = () => ({
  type: EditSkillAction.EDIT_END,
});

const isValidNumberInput = input => typeof input !== 'undefined' && input !== '' && typeof input === 'number';

const isValidStringInput = input => typeof input !== 'undefined' && input !== '';

const isInputValidSkill = (dispatch, skill) => {
  dispatch(removeAllInputErrors());

  const NUMBER_FIELD_INDEX = 3;
  const fieldNames = [
    SkillFormDialogNames.SKILL_NAME,
    SkillFormDialogNames.SKILL_LABEL,
    SkillFormDialogNames.SKILL_CATEGORY,
    SkillFormDialogNames.SKILL_BUSINESS_VALUE,
    SkillFormDialogNames.SKILL_PREDICTIVE_VALUE,
  ];
  const errorMessages = [
    PromptMessage.ENTER_VALID_NAME,
    PromptMessage.ENTER_VALID_LABEL,
    PromptMessage.ENTER_VALID_CATEGORY,
    PromptMessage.ENTER_VALID_BUSINESS_VALUE,
    PromptMessage.ENTER_VALID_PREDICTIVE_VALUE,
  ];
  for (let i = 0; i < NUMBER_FIELD_INDEX; i++) {
    if (!isValidStringInput(skill[fieldNames[i]])) {
      dispatch(showMessage(errorMessages[i]));
      dispatch(setInputError(fieldNames[i]));
      return false;
    }
  }
  for (let i = NUMBER_FIELD_INDEX; i < fieldNames.length; i++) {
    if (!isValidNumberInput(skill[fieldNames[i]])) {
      dispatch(showMessage(errorMessages[i]));
      dispatch(setInputError(fieldNames[i]));
      return false;
    }
  }
  return true;
};

export const createSkill = skill => (
  (dispatch) => {
    if (!isInputValidSkill(dispatch, skill)) {
      return null;
    }

    return new SkillsApi().createSkill(skill)
      .then((response) => {
        dispatch(stopEditSkill());
        dispatch(addSkills([response.data]));
      })
      .catch(() => {
        dispatch(showMessage(FAILED_TO_CREATE_SKILL));
      });
  }
);

export const updateSkill = skill => ((dispatch) => {
  if (!isInputValidSkill(dispatch, skill)) {
    return null;
  }

  return new SkillsApi().updateSkill(skill)
    .then((response) => {
      dispatch(removeAllInputErrors());
      dispatch(stopEditSkill());
      dispatch(updateSkillInList(response.data));
      dispatch(showMessage(NotificationMessage.CHANGES_UPDATED_SUCCESSFULLY));
    })
    .catch((error) => {
      dispatch(showMessage(`${ErrorMessage.FAILED_TO_UPDATE_SKILL}: ${error}`));
    });
});

export const handleCloseFormDialog = confirmed => ((dispatch, getState) => {
  if (confirmed) {
    const state = getState();
    const skill = getCurrentEditSkill(state);
    dispatch((isSkillCreation(state)) ? createSkill(skill) : updateSkill(skill));
  } else {
    dispatch(stopEditSkill());
  }
});
