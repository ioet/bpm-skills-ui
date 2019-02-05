import React, { Fragment } from 'react';
import LinkToSkills from './LinkToSkills';
import NewCategoryButtonContainer from './create/NewCategoryButtonContainer';
import DeleteDialogContainer from '../delete-dialog/DeleteDialogContainer';
import { AppConstants } from '../../AppConstants';
import BpmAppBar from '../bpm-app-bar/BpmAppBar';
import { removeCategories } from './delete/DeleteCategoryActions';
import DeleteCategoryDialogContent from './delete/DeleteCategoryDialogContent';
import CategoryFormDialogContent from './dialog-form/CategoryFormDialogContent';
import CategoryFormDialogContainer from './dialog-form/CategoryFormDialogContainer';
import { startCreateCategory } from './edit/EditCategoryActions';
import CategoryListContainer from './list/CategoryListContainer';

const CategoriesLayout = () => (
  <Fragment>
    <BpmAppBar title={AppConstants.TITLE_CATEGORIES} />
    <NewCategoryButtonContainer onClickCallback={startCreateCategory} />
    <LinkToSkills />
    <CategoryListContainer />
    <DeleteDialogContainer onConfirm={removeCategories}>
      <DeleteCategoryDialogContent />
    </DeleteDialogContainer>
    <CategoryFormDialogContainer>
      <CategoryFormDialogContent />
    </CategoryFormDialogContainer>
  </Fragment>
);

export default CategoriesLayout;
