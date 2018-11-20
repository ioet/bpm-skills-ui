/* eslint-disable no-plusplus */
import { combineReducers } from 'redux';
import { arrayToCategoryObject, getCategoryToBeCreated } from './component/utils/Utils';
import {
  DeleteAction, HoverAction, InputErrorAction, MessageAction, CategoryAction,
} from './action-types';

export const message = (state = { open: false }, action) => {
  switch (action.type) {
    case MessageAction.SHOW_MESSAGE:
      return {
        open: true,
        message: action.message,
      };
    case MessageAction.HIDE_MESSAGE:
      return {
        open: false,
        message: '',
      };
    default:
      return state;
  }
};

export const inputError = (state = {}, action) => {
  switch (action.type) {
    case InputErrorAction.ADD:
      return ({
        ...state,
        [action.field]: true,
      });
    case InputErrorAction.REMOVE_ALL:
      return {};
    default:
      return state;
  }
};

export const categoryEdit = (state = { editing: false }, action) => {
  switch (action.type) {
    case CategoryAction.EDIT_START:
      return ({
        id: action.id,
        editing: true,
      });
    case CategoryAction.EDIT_DATA:
      return ({
        ...state,
        [action.field]: action.value,
      });
    case CategoryAction.EDIT_END:
      return ({
        editing: false,
        name: null,
        business_value: null,
        predictive_value: null,
      });
    default:
      return state;
  }
};

export const categoryDelete = (state = { open: false }, action) => {
  switch (action.type) {
    case DeleteAction.SHOW_DIALOG:
      return {
        open: true,
        categoryIds: action.categoryIds,
      };
    case DeleteAction.HIDE_DIALOG:
      return {
        open: false,
      };
    default:
      return state;
  }
};

export const category = (state = {}, action) => {
  switch (action.type) {
    case CategoryAction.ADD_EMPTY_ROW:
      return {
        [getCategoryToBeCreated().id]: getCategoryToBeCreated(),
      };
    case CategoryAction.ADD_CATEGORY:
      return {
        [action.category.id]: action.category,
      };
    case CategoryAction.ADD_CATEGORIES:
      return arrayToCategoryObject(action.category, 'id');
    default:
      return state;
  }
};
export const categoryList = (state = {}, action) => {
  const copy = Object.assign({}, state);
  switch (action.type) {
    case CategoryAction.ADD_EMPTY_ROW:
      return {
        ...category(undefined, action),
        ...state,
      };
    case CategoryAction.REMOVE_EMPTY_ROW:
      delete copy[getCategoryToBeCreated().id];
      return { ...copy };
    case CategoryAction.ADD_CATEGORY:
      return {
        ...state,
        ...category(undefined, action),
      };
    case CategoryAction.ADD_CATEGORIES:
      return {
        ...state,
        ...category(undefined, action),
      };
    case CategoryAction.UPDATE:
      copy[action.category.id] = action.category;
      return { ...copy };
    case CategoryAction.REMOVE:
      delete copy[action.categoryId];
      return { ...copy };
    default:
      return state;
  }
};

export const hover = (state = { hover: false }, action) => {
  switch (action.type) {
    case HoverAction.OVER:
      return {
        hover: true,
        id: action.id,
      };
    case HoverAction.OUT:
      return {
        hover: false,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  categoryList,
  message,
  inputError,
  categoryEdit,
  categoryDelete,
  hover,
});

export default rootReducer;
