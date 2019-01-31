import { SkillAction } from '../../action-types';
import { arrayToObject, getSkillToBeCreated } from '../utils/Utils';

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


export default skillList;
