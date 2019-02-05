import { arrayToObject } from '../utils/Utils';
import { SkillAction } from './SkillActions';

const skillList = (state = {}, action) => {
  const copy = Object.assign({}, state);
  switch (action.type) {
    case SkillAction.ADD:
      return {
        ...state,
        ...arrayToObject(action.skill, 'id'),
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
