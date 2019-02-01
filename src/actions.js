/* eslint-disable camelcase,prefer-destructuring */
import { getSkillToBeCreated } from './component/utils/Utils';
import {
  ErrorMessage, NotificationMessage, PromptMessage, Variable,
} from './constants';
import { removeAllInputErrors, setInputError } from './component/text-field/BpmTextFieldActions';
import { showDeleteDialog } from './component/delete-dialog/DeleteDialogActions';
import { showMessage } from './component/notification/NotificationActions';

export const startCreateSkill = () => (
  (dispatch) => {
    dispatch(addEmptyRow());
    dispatch(startEditSkill(getSkillToBeCreated().skillToBeCreated));
  }
);

export const endCreateSkill = () => (
  (dispatch) => {
    dispatch(removeEmptyRow());
    dispatch(endEditSkill());
  }
);

export const setUpdateSkill = skillToUpdate => ({
  type: SkillAction.UPDATE,
  skill: skillToUpdate,
});

const validateField = input => !(typeof input === 'undefined' || input === '');

const validateInputWithErrorMessages = (dispatch, skill) => {
  if (!validateField(skill.name)) {
    dispatch(showMessage(PromptMessage.ENTER_VALID_NAME));
    dispatch(setInputError(Variable.NAME));
    return false;
  }
  return true;
};

const createSkillAsync = () => (
  (dispatch, getState) => {
    const skill = getState().skillEdit;

    if (!validateInputWithErrorMessages(dispatch, getState().skillEdit)) return null;
    return axios.post(SKILLS_API_PATH, {
      skill,
    })
      .then((response) => {
        dispatch(removeAllInputErrors());
        dispatch(endCreateSkill());
        dispatch(addSkill(response.data));
        dispatch(showMessage(response.data.name + NotificationMessage.SKILL_CREATED_SUCCESSFULLY));
      })
      .catch((error) => {
        dispatch(showMessage(`${ErrorMessage.FAILED_TO_CREATE_SKILL}: ${error}`));
      });
  }
);

const updateSkillAsync = skillId => (
  (dispatch, getState) => {
    const skill = getState().skillEdit;

    if (!validateInputWithErrorMessages(dispatch, skill)) {
      return null;
    }

    return axios.put(`${SKILLS_API_PATH}/${skillId}`, {
      skill,
    })
      .then((response) => {
        dispatch(removeAllInputErrors());
        dispatch(endEditSkill());
        dispatch(setUpdateSkill(response.data));
        dispatch(showMessage(NotificationMessage.CHANGES_UPDATED_SUCCESSFULLY));
      })
      .catch((error) => {
        dispatch(showMessage(`${ErrorMessage.FAILED_TO_UPDATE_SKILL}: ${error}`));
      });
  }
);

export const editUpdateOrCreateSkill = skillId => (
  (dispatch, getState) => {
    const skillEditId = getState().skillEdit.id;

    if (typeof skillEditId !== 'undefined') {
      if (skillEditId === skillId) {
        if (skillEditId === getSkillToBeCreated().skillToBeCreated.id) {
          return dispatch(createSkillAsync());
        }
        return dispatch(updateSkillAsync(skillId));
      }
      if (skillEditId === getSkillToBeCreated().skillToBeCreated.id) {
        dispatch(showMessage(NotificationMessage.CHANGES_DISCARDED));
        dispatch(removeAllInputErrors());
        dispatch(endCreateSkill());
      }
    }
    return dispatch(startEditSkill(getState().skillList[skillId]));
  }
);

export const clearSkill = creating => (
  (dispatch) => {
    if (creating) {
      dispatch(endCreateSkill());
    } else {
      dispatch(endEditSkill());
    }

    dispatch(removeAllInputErrors());
    dispatch(showMessage(NotificationMessage.CHANGES_DISCARDED));
  }
);

export const startOrEndCreateSkill = () => (
  (dispatch, getState) => {
    if (!getState().skillEdit.editing) {
      dispatch(startCreateSkill());
    } else {
      dispatch(clearSkill(true));
    }
  }
);

export const clearOrShowDelete = skillIds => (
  (dispatch, getState) => {
    if (skillIds[0] === getState().skillEdit.id) {
      dispatch(clearSkill(skillIds[0] === getSkillToBeCreated().skillToBeCreated.id));
    } else {
      dispatch(showDeleteDialog(skillIds));
    }
  }
);
