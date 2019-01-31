/* eslint-disable no-plusplus */
import { combineReducers } from 'redux';
import {
  HoverAction, MessageAction,
} from './action-types';
import skillDelete from './component/delete-dialog/DeleteDialogReducers';
import { skillEdit } from './component/skills/edit/EditSkillReducer';
import { inputError } from './component/text-field/BpmTextFieldReducer';
import skillList from './component/skills/SkillReducer';

const message = (state = { open: false }, action) => {
  switch (action.type) {
    case MessageAction.MESSAGE:
      return ({
        open: action.open,
        message: action.message,
      });
    default:
      return state;
  }
};



const hover = (state = { hover: false }, action) => {
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
  skillList,
  message,
  inputError,
  skillEdit,
  skillDelete,
  hover,
});

export default rootReducer;
