import { showMessage } from '../bpm-notification/NotificationActions';
import SkillsApi from '../skillsApi/SkillsApi';
import { ErrorMessage } from '../bpm-notification/NotificationConstants';

export const CategoryAction = {
  ADD: 'CATEGORY_ADD',
  UPDATE: 'CATEGORY_UPDATE',
  REMOVE: 'CATEGORY_REMOVE',
};

export const addCategories = allCategories => ({
  type: CategoryAction.ADD,
  categories: allCategories,
});

export const updateCategoryInList = categoryToUpdate => ({
  type: CategoryAction.UPDATE,
  category: categoryToUpdate,
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
