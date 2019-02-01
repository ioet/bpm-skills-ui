import { getCurrentEditSkill, isSkillCreation } from './EditSkillSelector';
import SkillsApi from '../../skillsApi/SkillsApi';
import { showMessage } from '../../notification/NotificationActions';
import { FAILED_TO_CREATE_SKILL } from '../create/NewSkillConstants';
import { addSkills, updateSkillInList } from '../SkillActions';
import { getSkillById } from '../SkillSelector';
import { removeAllInputErrors } from '../../text-field/BpmTextFieldActions';
import { ErrorMessage, NotificationMessage } from '../../../constants';

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

export const createSkill = skill => (
  (dispatch) => {
    new SkillsApi().createSkill(skill)
      .then((response) => {
        dispatch(stopEditSkill());
        dispatch(addSkills([response.data]));
      })
      .catch((error) => {
        console.log(error);
        dispatch(showMessage(FAILED_TO_CREATE_SKILL));
      });
  }
);

export const updateSkill = skill => ((dispatch) => {
  new SkillsApi().updateSkill(skill)
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
