import { getCurrentEditSkill, isSkillCreation } from './EditSkillSelector';
import SkillsApi from '../../skillsApi/SkillsApi';
import { showMessage } from '../../../actions';

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
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        dispatch(showMessage('SOME_ERROR_MESSAGE'));
      });
  }
);

export const updateSkill = skill => (dispatch => dispatch(showMessage('UPDATE SKILL')));

export const handleCloseFormDialog = confirmed => ((dispatch, getState) => {
  if (confirmed) {
    const state = getState();
    const skill = getCurrentEditSkill(state);
    dispatch((isSkillCreation(state)) ? createSkill(skill) : updateSkill(skill));
  } else {
    dispatch(stopEditSkill());
  }
});
