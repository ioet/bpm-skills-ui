import { ErrorMessage, NotificationMessage } from '../../constants';
import { showMessage } from '../../actions';
import { SkillAction } from '../../action-types';
import SkillsApi from '../skillsApi/SkillsApi';

export const DeleteAction = {
  SHOW_DIALOG: 'SHOW_DIALOG',
  HIDE_DIALOG: 'HIDE_DIALOG',
};

export const showDeleteDialog = skillIds => ({
  type: DeleteAction.SHOW_DIALOG,
  open: true,
  skillIds,
});

export const hideDeleteDialog = () => ({
  type: DeleteAction.HIDE_DIALOG,
  open: false,
});

const removeSkill = skillId => ({
  type: SkillAction.REMOVE,
  skillId,
});

export const removeSkills = skillIds => ((dispatch, getState) => {
  skillIds.forEach((id) => {
    new SkillsApi().deleteSkill(id)
      .then(() => {
        dispatch(showMessage(getState().skillList[id].name + NotificationMessage.SKILL_DELETED_SUCCESSFULLY));
        dispatch(removeSkill(id));
      })
      .catch((error) => {
        dispatch(showMessage(`${ErrorMessage.FAILED_TO_REMOVE_SKILL}: ${error}`));
      });
  });
});
