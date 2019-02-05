import DeleteDialogConst from './DeleteDialogConstants';

export const isDialogOpen = state => state.deleteReducer.open;

export const getSkillNameToDelete = (state) => {
  const { ids } = state.deleteReducer;
  let skillName = '';
  if (typeof ids !== 'undefined') {
    skillName = (ids.length > 1)
      ? ids.length + DeleteDialogConst.CONTENT_TEXT_MULTI_SKILL
      : state.skillList[ids].name;
  }
  return skillName;
};

export const getCategoryNameToDelete = (state) => {
  const { ids } = state.deleteReducer;
  let categoryName = '';
  if (typeof ids !== 'undefined') {
    categoryName = (ids.length > 1)
      ? ids.length + DeleteDialogConst.CONTENT_TEXT_MULTI_CATEGORY
      : state.categoryList[ids].name;
  }
  return categoryName;
};

export const getIdsToDelete = state => state.deleteReducer.ids;
