import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentEditCategory } from '../edit/EditCategorySelector';
import BpmTextFieldContainer from '../../bpm-text-field/BpmTextFieldContainer';
import { CategoryFormDialogLabels, CategoryFormDialogNames } from './CategoryFormDialogConstants';
import { handleCloseFormDialog, setCategoryEditData } from '../edit/EditCategoryActions';


const mapStateToProps = state => ({
  category: getCurrentEditCategory(state),
});

const CategoryFormDialogContent = (props) => {
  const { category } = props;
  return (
    <Fragment>
      <BpmTextFieldContainer
        name={CategoryFormDialogNames.CATEGORY_NAME}
        label={CategoryFormDialogLabels.CATEGORY_NAME_LABEL}
        value={category.name}
        onInputChange={setCategoryEditData}
      />
      <BpmTextFieldContainer
        name={CategoryFormDialogNames.CATEGORY_BUSINESS_VALUE}
        label={CategoryFormDialogLabels.CATEGORY_BUSINESS_VALUE_LABEL}
        value={category.business_value}
        onInputChange={setCategoryEditData}
      />
      <form onSubmit={(e) => {
        e.preventDefault();
        handleCloseFormDialog(true);
      }}
      >
        <BpmTextFieldContainer
          name={CategoryFormDialogNames.CATEGORY_PREDICTIVE_VALUE}
          label={CategoryFormDialogLabels.CATEGORY_PREDICTIVE_VALUE_LABEL}
          value={category.predictive_value}
          onInputChange={setCategoryEditData}
        />
      </form>
    </Fragment>
  );
};

CategoryFormDialogContent.propTypes = {
  category: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(CategoryFormDialogContent);
