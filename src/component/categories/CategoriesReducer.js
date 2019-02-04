import { arrayToObject } from '../utils/Utils';
import { CategoryAction } from './CategoryActions';

const categoryList = (state = {}, action) => {
  const copy = Object.assign({}, state);
  switch (action.type) {
    case CategoryAction.ADD:
      return {
        ...state,
        ...arrayToObject(action.categories, 'id'),
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

export default categoryList;
