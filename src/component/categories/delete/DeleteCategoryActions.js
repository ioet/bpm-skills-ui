import SkillsApi from '../../skillsApi/SkillsApi';
import { showMessage } from '../../bpm-notification/NotificationActions';
import { ErrorMessage, NotificationMessage } from '../../bpm-notification/NotificationConstants';
import { CategoryAction } from '../CategoryActions';
import { getIdsToDelete } from '../../delete-dialog/DeleteDialogSelector';

export const removeCategory = categoryId => ({
  type: CategoryAction.REMOVE,
  categoryId,
});

export const removeCategories = () => ((dispatch, getState) => {
  const skillIds = getIdsToDelete(getState());
  skillIds.forEach((id) => {
    new SkillsApi().deleteCategory(id)
      .then(() => {
        dispatch(showMessage(getState().categoryList[id].name + NotificationMessage.SKILL_DELETED_SUCCESSFULLY));
        dispatch(removeCategory(id));
      })
      .catch((error) => {
        dispatch(showMessage(`${ErrorMessage.FAILED_TO_REMOVE_SKILL}: ${error}`));
      });
  });
});
