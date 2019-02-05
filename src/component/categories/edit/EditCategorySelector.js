export const getCurrentEditCategory = state => state.categoryEdit.category;

export const isCategoryDialogFormOpen = state => state.categoryEdit.editing;

export const isCategoryCreation = state => typeof state.categoryEdit.category.id === 'undefined';
