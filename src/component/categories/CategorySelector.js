export const getCategoryNameById = (state, id) => {
  if (typeof state.categoryList[id] !== 'undefined') {
    return state.categoryList[id].name;
  }
  return 'category not found';
};

export const getCategoryList = state => state.categoryList;
