export const getCategoryNameById = (state, categoryId) => {
  if (typeof state.categoryList[categoryId] !== 'undefined') {
    return state.categoryList[categoryId].name;
  }
  return 'category not found';
};

export const getCategoryById = (state, categoryId) => state.categoryList[categoryId];

export const getCategoryList = state => state.categoryList;
