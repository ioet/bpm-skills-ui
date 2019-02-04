import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { AppConstants } from '../../AppConstants';

const LinkToCategories = () => (
  <Link to="/">
    <Button color="primary">
      {AppConstants.MANAGE_SKILLS}
    </Button>
  </Link>
);

export default LinkToCategories;
