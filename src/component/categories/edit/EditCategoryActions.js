import { getCurrentEditCategory, isCategoryCreation } from './EditCategorySelector';
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

const isValidNumberInput = input => typeof input !== 'undefined' && input !== '' && typeof input === 'number';

const isValidStringInput = input => typeof input !== 'undefined' && input !== '';

const isInputValidCategory = (dispatch, category) => {
  dispatch(removeAllInputErrors());

  const NUMBER_FIELD_INDEX = 1;
  const fieldNames = [
    CategoryFormDialogNames.CATEGORY_NAME,
    CategoryFormDialogNames.CATEGORY_BUSINESS_VALUE,
    CategoryFormDialogNames.CATEGORY_PREDICTIVE_VALUE,
  ];
  const errorMessages = [
    PromptMessage.ENTER_VALID_NAME,
    PromptMessage.ENTER_VALID_BUSINESS_VALUE,
    PromptMessage.ENTER_VALID_PREDICTIVE_VALUE,
  ];
  for (let i = 0; i < NUMBER_FIELD_INDEX; i++) {
    if (!isValidStringInput(category[fieldNames[i]])) {
      dispatch(showMessage(errorMessages[i]));
      dispatch(setInputError(fieldNames[i]));
      return false;
    }
  }
  for (let i = NUMBER_FIELD_INDEX; i < fieldNames.length; i++) {
    if (!isValidNumberInput(category[fieldNames[i]])) {
      dispatch(showMessage(errorMessages[i]));
      dispatch(setInputError(fieldNames[i]));
      return false;
    }
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
      .catch(() => {
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
