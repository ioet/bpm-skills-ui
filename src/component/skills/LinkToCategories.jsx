import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { AppConstants } from '../../AppConstants';

const LinkToCategories = () => (
  <Link to="/categories">
    <Button color="primary">
      {AppConstants.MANAGE_CATEGORIES}
    </Button>
  </Link>
);

export default LinkToCategories;
