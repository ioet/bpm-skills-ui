import { arrayToObject } from '../utils/Utils';
import { CategoriesAction } from './CategoriesActions';

const categoryList = (state = {}, action) => {
  const copy = Object.assign({}, state);
  switch (action.type) {
    case CategoriesAction.ADD:
      return {
        ...state,
        ...arrayToObject(action.categories, 'id'),
      };
    case CategoriesAction.UPDATE:
      copy[action.category.id] = action.category;
      return { ...copy };
    case CategoriesAction.REMOVE:
      delete copy[action.categoryId];
      return { ...copy };
    default:
      return state;
  }
};

export default categoryList;
