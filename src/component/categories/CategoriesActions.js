import { showMessage } from '../bpm-notification/NotificationActions';
import SkillsApi from '../skillsApi/SkillsApi';
import { ErrorMessage } from '../bpm-notification/NotificationConstants';

export const CategoriesAction = {
  ADD: 'CATEGORY_ADD',
  EDIT_START: 'CATEGORY_EDIT_START',
  EDIT_END: 'CATEGORY_EDIT_END',
  EDIT_DATA: 'CATEGORY_EDIT_DATA',
  UPDATE: 'CATEGORY_UPDATE',
  REMOVE: 'CATEGORY_REMOVE',
};

const addCategories = allCategories => ({
  type: CategoriesAction.ADD,
  categories: allCategories,
});

export const getAllCategories = () => (
  (dispatch) => {
    new SkillsApi().getAllCategories()
      .then((response) => {
        dispatch(addCategories(response.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(showMessage(`${ErrorMessage.FAILED_TO_LOAD_CATEGORIES}: ${error}`));
      });
  }
);
