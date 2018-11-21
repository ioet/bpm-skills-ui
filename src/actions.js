/* eslint-disable camelcase,prefer-destructuring */
import { Category, CategoryControllerApi } from 'swagger_bpm_categories_api';
import { getCategoryToBeCreated } from './component/utils/Utils';
import {
  CategoryAction, DeleteAction, HoverAction, InputErrorAction, MessageAction,
} from './action-types';
import {
  ErrorMessage, NotificationMessage, PromptMessage, Variable,
} from './constants';
import { getEditId } from './selectors';

const categoryApi = new CategoryControllerApi();

export const addCategories = allCategories => ({
  type: CategoryAction.ADD_CATEGORIES,
  category: allCategories,
});
export const addCategory = oneCategory => ({
  type: CategoryAction.ADD_CATEGORY,
  category: oneCategory,
});

export const setInputError = field => ({
  type: InputErrorAction.ADD,
  field,
});
export const removeAllInputErrors = () => ({
  type: InputErrorAction.REMOVE_ALL,
});

export const showMessage = errorMessage => ({
  type: MessageAction.SHOW_MESSAGE,
  message: errorMessage,
});
export const hideMessage = () => ({
  type: MessageAction.HIDE_MESSAGE,
});

export const showDeleteDialog = categoryIds => ({
  type: DeleteAction.SHOW_DIALOG,
  open: true,
  categoryIds,
});
export const hideDeleteDialog = () => ({
  type: DeleteAction.HIDE_DIALOG,
  open: false,
});

export const addEmptyRow = () => ({
  type: CategoryAction.ADD_EMPTY_ROW,
});

export const removeEmptyRow = () => ({
  type: CategoryAction.REMOVE_EMPTY_ROW,
});

export const startEditCategory = editCategoryId => ({
  type: CategoryAction.EDIT_START,
  id: editCategoryId,
});
export const setCategoryEditData = (field, value) => ({
  type: CategoryAction.EDIT_DATA,
  field,
  value,
});
export const endEditCategory = () => ({
  type: CategoryAction.EDIT_END,
});

export const startCreateCategory = () => (
  (dispatch) => {
    dispatch(addEmptyRow());
    dispatch(startEditCategory(getCategoryToBeCreated().id));
  }
);

export const endCreateCategory = () => (
  (dispatch) => {
    dispatch(removeEmptyRow());
    dispatch(endEditCategory());
  }
);

export const setUpdateCategory = categoryToUpdate => ({
  type: CategoryAction.UPDATE,
  category: categoryToUpdate,
});

export const removeCategory = categoryId => ({
  type: CategoryAction.REMOVE,
  categoryId,
});

export const getAllCategoriesAsync = () => (
  dispatch => categoryApi.getAllCategoriesUsingGET()
    .then((data) => {
      dispatch(addCategories(data));
    })
    .catch((error) => {
      // console.log(error); find a way to log this error
      dispatch(showMessage(ErrorMessage.FAILED_TO_LOAD_CATEGORIES));
    })
);

export const validateField = input => (typeof input !== 'undefined' && input !== '');

export const validateInputWithErrorMessages = (dispatch, category) => {
  const reDouble = /^\d{0,2}(?:\.\d{0,2}){0,1}$/;
  if (!validateField(category.name)) {
    dispatch(showMessage(PromptMessage.ENTER_VALID_NAME));
    dispatch(setInputError(Variable.NAME));
    return false;
  }

  if (category.predictive_value.toString().match(reDouble) === null) {
    dispatch(showMessage(PromptMessage.ENTER_VALID_PREDICTIVE_VALUE));
    dispatch(setInputError(Variable.PREDICTIVE_VALUE));
    return false;
  }

  if (category.business_value.toString().match(reDouble) === null) {
    dispatch(showMessage(PromptMessage.ENTER_VALID_BUSINESS_VALUE));
    dispatch(setInputError(Variable.BUSINESS_VALUE));
    return false;
  }

  return true;
};

export const createCategoryAsync = () => (
  (dispatch, getState) => {
    const { name, business_value, predictive_value } = getState().categoryEdit;

    if (!validateInputWithErrorMessages(dispatch, getState().categoryEdit)) return null;

    const categoryToCreate = new Category();
    categoryToCreate.name = name;
    categoryToCreate.business_value = business_value;
    categoryToCreate.predictive_value = predictive_value;
    return categoryApi.createCategoryUsingPOST(categoryToCreate)
      .then((data) => {
        dispatch(removeAllInputErrors());
        dispatch(endCreateCategory());
        dispatch(addCategory(data));
        dispatch(showMessage(data.name + NotificationMessage.CATEGORY_CREATED_SUCCESSFULLY));
      })
      .catch((error) => {
        // console.log(error); find a way to log this error
        dispatch(showMessage(ErrorMessage.FAILED_TO_CREATE_CATEGORY));
      });
  }
);

export const updateCategoryAsync = categoryId => (
  (dispatch, getState) => {
    const { id } = getState().categoryEdit;
    const category = getState().categoryList[categoryId];
    let {
      name, business_value, predictive_value,
    } = getState().categoryEdit;

    if (typeof name === 'undefined' && typeof business_value === 'undefined'
        && typeof predictive_value === 'undefined') {
      dispatch(removeAllInputErrors());
      return dispatch(endEditCategory());
    }

    if (typeof name === 'undefined') {
      name = category.name;
    }
    if (typeof business_value === 'undefined') {
      business_value = category.business_value;
    }
    if (typeof predictive_value === 'undefined') {
      predictive_value = category.predictive_value;
    }

    if (!validateInputWithErrorMessages(dispatch, {
      name,
      business_value,
      predictive_value,
    })) {
      return null;
    }

    const categoryToUpdate = new Category();
    categoryToUpdate.name = name;
    categoryToUpdate.business_value = business_value;
    categoryToUpdate.predictive_value = predictive_value;
    return categoryApi.updateCategoryUsingPUT(categoryToUpdate, id)
      .then((data) => {
        dispatch(removeAllInputErrors());
        dispatch(endEditCategory());
        dispatch(setUpdateCategory(data));
        dispatch(showMessage(NotificationMessage.CHANGES_UPDATED_SUCCESSFULLY));
      })
      .catch((error) => {
        // console.log(error); // find a way to log this error
        dispatch(showMessage(ErrorMessage.FAILED_TO_UPDATE_CATEGORY));
      });
  }
);

export const editUpdateOrCreateCategory = categoryId => (
  (dispatch, getState) => {
    const categoryEditId = getEditId(getState());

    if (typeof categoryEditId !== 'undefined') {
      if (categoryEditId === categoryId) {
        if (categoryEditId === getCategoryToBeCreated().id) {
          return dispatch(createCategoryAsync());
        }
        return dispatch(updateCategoryAsync(categoryId));
      }
      if (categoryEditId === getCategoryToBeCreated().id) {
        dispatch(showMessage(NotificationMessage.CHANGES_DISCARDED));
        dispatch(removeAllInputErrors());
        dispatch(endCreateCategory());
      }
    }
    return dispatch(startEditCategory(categoryId));
  }
);

export const removeCategoryAsync = categoryId => (
  (dispatch, getState) => categoryApi.deleteCategoryUsingDELETE(categoryId)
    .then(() => {
      dispatch(showMessage(getState().categoryList[categoryId].name
          + NotificationMessage.CATEGORY_DELETED_SUCCESSFULLY));
      dispatch(removeCategory(categoryId));
    })
    .catch((error) => {
      // console.log(error); find a way to log this error
      dispatch(showMessage(ErrorMessage.FAILED_TO_REMOVE_CATEGORY));
    })
);

export const clearCategory = creating => (
  (dispatch) => {
    if (creating) {
      dispatch(endCreateCategory());
    } else {
      dispatch(endEditCategory());
    }

    dispatch(removeAllInputErrors());
    dispatch(showMessage(NotificationMessage.CHANGES_DISCARDED));
  }
);

export const startOrEndCreateCategory = () => (
  (dispatch, getState) => {
    if (!getState().categoryEdit.editing) {
      dispatch(startCreateCategory());
    } else {
      dispatch(clearCategory(true));
    }
  }
);

export const clearOrShowDelete = categoryIds => (
  (dispatch, getState) => {
    if (categoryIds[0] === getState().categoryEdit.id) {
      dispatch(clearCategory(categoryIds[0] === getCategoryToBeCreated().id));
    } else {
      dispatch(showDeleteDialog(categoryIds));
    }
  }
);

export const hoverOver = id => ({
  type: HoverAction.OVER,
  id,
});

export const hoverOut = () => ({
  type: HoverAction.OUT,
});
