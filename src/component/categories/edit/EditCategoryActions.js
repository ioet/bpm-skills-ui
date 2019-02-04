import {
  getCurrentEditCategory,
  getCurrentEditcategory,
  isCategoryCreation,
  isSkillCreation
} from './EditCategorySelector';
import { showMessage } from '../../bpm-notification/NotificationActions';
import SkillsApi from '../../skillsApi/SkillsApi';
import { FAILED_TO_CREATE_CATEGORY } from '../create/NewCategoryConstants';
import { ErrorMessage, NotificationMessage, PromptMessage } from '../../bpm-notification/NotificationConstants';
import { CategoryFormDialogNames } from '../dialog-form/CategoryFormDialogConstants';
import { removeAllInputErrors, setInputError } from '../../bpm-text-field/BpmTextFieldActions';
import { addCategories, updateCategoryInList } from '../CategoryActions';
import { getCategoryById } from '../CategorySelector';

export const EditCategoryAction = {
  EDIT_START: 'EDIT_START',
  EDIT_DATA: 'EDIT_DATA',
  EDIT_END: 'EDIT_END',
};

export const startCreateCategory = () => ({
  type: EditCategoryAction.EDIT_START,
  category: {},
});

export const startEditCategory = category => ({
  type: EditCategoryAction.EDIT_START,
  category,
});

export const editCategory = categoryId => (dispatch, getState) => {
  dispatch(startEditCategory(getCategoryById(getState(), categoryId)));
};

export const setCategoryEditData = (field, value) => ({
  type: EditCategoryAction.EDIT_DATA,
  field,
  value,
});

export const stopEditCategory = () => ({
  type: EditCategoryAction.EDIT_END,
});

const isValidField = input => typeof input !== 'undefined' && input !== '';

const isInputValidCategory = (dispatch, category) => {
  if (!isValidField(category.name)) {
    dispatch(showMessage(PromptMessage.ENTER_VALID_NAME));
    dispatch(setInputError(CategoryFormDialogNames.CATEGORY_NAME));
    return false;
  }
  return true;
};

export const createCategory = category => (
  (dispatch) => {
    if (!isInputValidCategory(dispatch, category)) {
      return null;
    }

    return new SkillsApi().createCategory(category)
      .then((response) => {
        dispatch(stopEditCategory());
        dispatch(addCategories([response.data]));
      })
      .catch((error) => {
        console.log(error);
        dispatch(showMessage(FAILED_TO_CREATE_CATEGORY));
      });
  }
);

export const updateCategory = category => ((dispatch) => {
  if (!isInputValidCategory(dispatch, category)) {
    return null;
  }

  return new SkillsApi().updateCategory(category)
    .then((response) => {
      dispatch(removeAllInputErrors());
      dispatch(stopEditCategory());
      dispatch(updateCategoryInList(response.data));
      dispatch(showMessage(NotificationMessage.CHANGES_UPDATED_SUCCESSFULLY));
    })
    .catch((error) => {
      dispatch(showMessage(`${ErrorMessage.FAILED_TO_UPDATE_SKILL}: ${error}`));
    });
});

export const handleCloseFormDialog = confirmed => ((dispatch, getState) => {
  if (confirmed) {
    const state = getState();
    const category = getCurrentEditCategory(state);
    dispatch((isCategoryCreation(state)) ? createCategory(category) : updateCategory(category));
  } else {
    dispatch(stopEditCategory());
  }
});
