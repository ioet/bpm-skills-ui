import { ErrorMessage, NotificationMessage } from '../../constants';
import SkillsApi from '../skillsApi/SkillsApi';
import { showMessage } from '../notification/NotificationActions';
import { SkillAction } from '../skills/SkillActions';
import { getSkillIdsToDelete } from './DeleteDialogSelector';

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

export const removeSkills = () => ((dispatch, getState) => {
  const skillIds = getSkillIdsToDelete(getState());
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

export const handleCloseDeleteDialog = confirmed => ((dispatch) => {
  if (confirmed) {
    dispatch(removeSkills());
  }
});
