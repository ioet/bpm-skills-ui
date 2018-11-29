import React from 'react';
import {
  Add, Clear, Delete, Done, Edit,
} from '@material-ui/icons';
import { DeleteDialogConst, FloatingActionButtonConst, CategoryListItemConst } from './constants';

export const isDeleteDialogOpen = state => state.categoryDelete.open;

export const getCategoryIds = state => state.categoryDelete.categoryIds;

export const getCategoryName = (state) => {
  const { categoryIds } = state.categoryDelete;
  if (!categoryIds) return undefined;
  return (categoryIds.length > 1)
    ? categoryIds.length + DeleteDialogConst.CONTENT_TEXT_MULTI_CATEGORY
    : state.categoryList[categoryIds].name;
};

export const getEditId = state => state.categoryEdit.id;

export const getInputError = (state, ownProps) => state.inputError[ownProps.name];

export const isMessageOpen = state => state.message.open;

export const getMessage = state => state.message.message;

export const getFabTooltip = state => ((state.categoryEdit.editing)
  ? FloatingActionButtonConst.TOOLTIP_DISCARD
  : FloatingActionButtonConst.TOOLTIP_ADD
);

export const getFabIcon = state => ((state.categoryEdit.editing) ? <Clear /> : <Add />);

export const isHoverActive = state => state.hover.hover;

export const getHoverId = state => state.hover.id;

export const getDeleteButtonIcon = (state, ownProps) => (
  (state.categoryEdit.id === ownProps.categoryId) ? <Clear /> : <Delete />
);

export const getDeleteButtonTooltip = (state, ownProps) => (
  (state.categoryEdit.id === ownProps.categoryId)
    ? CategoryListItemConst.TOOLTIP_DISCARD
    : CategoryListItemConst.TOOLTIP_DELETE
);

export const getEditButtonIcon = (state, ownProps) => (
  (state.categoryEdit.id === ownProps.categoryId) ? <Done /> : <Edit />
);

export const getEditButtonTooltip = (state, ownProps) => (
  (state.categoryEdit.id === ownProps.categoryId)
    ? CategoryListItemConst.TOOLTIP_SAVE
    : CategoryListItemConst.TOOLTIP_EDIT
);

export const getCategoryList = state => state.categoryList;
