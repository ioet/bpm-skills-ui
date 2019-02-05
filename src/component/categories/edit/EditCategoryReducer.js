import { EditCategoryAction } from './EditCategoryActions';

const categoryEdit = (state = { editing: false, category: {} }, action) => {
  switch (action.type) {
    case EditCategoryAction.EDIT_START:
      return {
        ...state,
        editing: true,
        category: action.category,
      };
    case EditCategoryAction.EDIT_DATA:
      return {
        ...state,
        category: {
          ...state.category,
          [action.field]: action.value,
        },
      };
    case EditCategoryAction.EDIT_END:
      return {
        editing: false,
        category: {},
      };
    default:
      return state;
  }
};

export default categoryEdit;
