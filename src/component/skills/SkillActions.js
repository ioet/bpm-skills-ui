import { showMessage } from '../bpm-notification/NotificationActions';
import SkillsApi from '../skillsApi/SkillsApi';
import { ErrorMessage } from '../bpm-notification/NotificationConstants';

export const SkillAction = {
  ADD: 'SKILL_ADD',
  UPDATE: 'SKILL_UPDATE',
  REMOVE: 'SKILL_REMOVE',
};

export const addSkills = allSkills => ({
  type: SkillAction.ADD,
  skill: allSkills,
});

export const updateSkillInList = skillToUpdate => ({
  type: SkillAction.UPDATE,
  skill: skillToUpdate,
});

export const getAllSkills = () => (
  (dispatch) => {
    new SkillsApi().getAllSkills()
      .then((response) => {
        dispatch(addSkills(response.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(showMessage(`${ErrorMessage.FAILED_TO_LOAD_SKILLS}: ${error}`));
      });
  }
);
