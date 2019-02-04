import { SkillAction } from '../SkillActions';
import { getIdsToDelete } from '../../delete-dialog/DeleteDialogSelector';
import SkillsApi from '../../skillsApi/SkillsApi';
import { showMessage } from '../../bpm-notification/NotificationActions';
import { ErrorMessage, NotificationMessage } from '../../bpm-notification/NotificationConstants';

export const removeSkill = skillId => ({
  type: SkillAction.REMOVE,
  skillId,
});

export const removeSkills = () => ((dispatch, getState) => {
  const skillIds = getIdsToDelete(getState());
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
