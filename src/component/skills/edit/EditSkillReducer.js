import { EditSkillAction } from './EditSkillActions';

export const skillEdit = (state = { editing: false, skill: {} }, action) => {
  switch (action.type) {
    case EditSkillAction.EDIT_START:
      return {
        ...state,
        editing: true,
        skill: action.skill,
      };
    case EditSkillAction.EDIT_DATA:
      return {
        ...state,
        skill: {
          [action.field]: action.value,
        },
      };
    case EditSkillAction.EDIT_END:
      return {
        editing: false,
        skill: {},
      };
    default:
      return state;
  }
};
