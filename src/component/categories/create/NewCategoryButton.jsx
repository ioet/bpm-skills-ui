import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { NEW_CATEGORY_LABEL } from './NewCategoryConstants';

const NewCategoryButton = (props) => {
  const { onClickCallback } = props;

  return (
    <Button
      color="primary"
      onClick={(e) => {
        e.preventDefault();
        onClickCallback();
      }}
    >
      {NEW_CATEGORY_LABEL}
    </Button>
  );
};


NewCategoryButton.propTypes = {
  onClickCallback: PropTypes.func.isRequired,
};

export default NewCategoryButton;
