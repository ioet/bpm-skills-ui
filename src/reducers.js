/* eslint-disable no-plusplus */
import { combineReducers } from 'redux';
import { arrayToObject, getSkillToBeCreated } from './component/utils/Utils';
import {
  DeleteAction, HoverAction, InputErrorAction, MessageAction, SkillAction,
} from './action-types';

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

const inputError = (state = {}, action) => {
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

const skillEdit = (state = { editing: false }, action) => {
  switch (action.type) {
    case SkillAction.EDIT_START:
      return ({
        id: action.id,
        editing: true,
      });
    case SkillAction.EDIT_DATA:
      return ({
        ...state,
        [action.field]: action.name,
      });
    case SkillAction.EDIT_END:
      return ({
        editing: false,
        name: null,
      });
    default:
      return state;
  }
};

const skillDelete = (state = { open: false }, action) => {
  switch (action.type) {
    case DeleteAction.SHOW_DIALOG:
      return {
        open: true,
        skillIds: action.skillIds,
      };
    case DeleteAction.HIDE_DIALOG:
      return {
        open: false,
      };
    default:
      return state;
  }
};

const skill = (state, action) => {
  switch (action.type) {
    case SkillAction.ADD_EMPTY_ROW:
      return getSkillToBeCreated();
    case SkillAction.ADD_SKILL:
      return {
        [action.id]: {
          id: action.id,
          name: action.name,
        },
      };
    case SkillAction.ADD_SKILLS:
      return arrayToObject(action.skill, 'id');
    default:
      return state;
  }
};
const skillList = (state = {}, action) => {
  const copy = Object.assign({}, state);
  switch (action.type) {
    case SkillAction.ADD_EMPTY_ROW:
      return {
        ...skill(undefined, action),
        ...state,
      };
    case SkillAction.REMOVE_EMPTY_ROW:
      delete copy[getSkillToBeCreated().skillToBeCreated.id];
      return { ...copy };
    case SkillAction.ADD_SKILL:
      return {
        ...state,
        ...skill(undefined, action),
      };
    case SkillAction.ADD_SKILLS:
      return {
        ...state,
        ...skill(undefined, action),
      };
    case SkillAction.UPDATE:
      copy[action.skill.id] = action.skill;
      return { ...copy };
    case SkillAction.REMOVE:
      delete copy[action.skillId];
      return { ...copy };
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
