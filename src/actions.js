/* eslint-disable camelcase,prefer-destructuring */
import { SkillControllerApi, Skill } from 'swagger_bpm_skills_api';
import { getSkillToBeCreated } from './component/utils/Utils';
import {
  DeleteAction, HoverAction, InputErrorAction, MessageAction, SkillAction,
} from './action-types';
import {
  ErrorMessage, NotificationMessage, PromptMessage, Variable,
} from './constants';

const skillApi = new SkillControllerApi();

const addSkills = allSkills => ({
  type: SkillAction.ADD_SKILLS,
  skill: allSkills,
});
export const addSkill = oneSkill => ({
  type: SkillAction.ADD_SKILL,
  id: oneSkill.id,
  name: oneSkill.name,
});

const setInputError = field => ({
  type: InputErrorAction.ADD,
  field,
});
const removeAllInputErrors = () => ({
  type: InputErrorAction.REMOVE_ALL,
});

export const showMessage = errorMessage => ({
  type: MessageAction.MESSAGE,
  open: true,
  message: errorMessage,
});
export const hideMessage = () => ({
  type: MessageAction.MESSAGE,
  open: false,
  message: '',
});

export const showDeleteDialog = skillIds => ({
  type: DeleteAction.SHOW_DIALOG,
  open: true,
  skillIds,
});
export const hideDeleteDialog = () => ({
  type: DeleteAction.HIDE_DIALOG,
  open: false,
});

export const addEmptyRow = () => ({
  type: SkillAction.ADD_EMPTY_ROW,
});

export const removeEmptyRow = () => ({
  type: SkillAction.REMOVE_EMPTY_ROW,
});

export const startEditSkill = editSkill => ({
  type: SkillAction.EDIT_START,
  skill: editSkill,
});
export const setSkillEditData = (field, name) => ({
  type: SkillAction.EDIT_DATA,
  field,
  name,
});
export const endEditSkill = () => ({
  type: SkillAction.EDIT_END,
});

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

const removeSkill = skillId => ({
  type: SkillAction.REMOVE,
  skillId,
});

export const getAllSkillsAsync = () => (
  dispatch => skillApi.getAllSkillsUsingGET()
    .then((data) => {
      dispatch(addSkills(data));
    })
    .catch((error) => {
      dispatch(showMessage(`${ErrorMessage.FAILED_TO_LOAD_SKILLS}: ${error}`));
    })
);

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
    const { name } = getState().skillEdit;

    if (!validateInputWithErrorMessages(dispatch, getState().skillEdit)) return null;

    const skillToCreate = new Skill();
    skillToCreate.name = name;
    return skillApi.createSkillUsingPOST(skillToCreate)
      .then((data) => {
        dispatch(removeAllInputErrors());
        dispatch(endCreateSkill());
        dispatch(addSkill(data));
        dispatch(showMessage(data.name + NotificationMessage.SKILL_CREATED_SUCCESSFULLY));
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

    return skillApi.updateSkillUsingPUT(skillId, skill)
      .then((data) => {
        dispatch(removeAllInputErrors());
        dispatch(endEditSkill());
        dispatch(setUpdateSkill(data));
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

export const removeSkillAsync = skillId => (
  (dispatch, getState) => skillApi.deleteSkillUsingDELETE(skillId)
    .then(() => {
      dispatch(showMessage(getState().skillList[skillId].name + NotificationMessage.SKILL_DELETED_SUCCESSFULLY));
      dispatch(removeSkill(skillId));
    })
    .catch((error) => {
      dispatch(showMessage(`${ErrorMessage.FAILED_TO_REMOVE_SKILL}: ${error}`));
    })
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

export const hoverOver = id => ({
  type: HoverAction.OVER,
  id,
});

export const hoverOut = () => ({
  type: HoverAction.OUT,
});
