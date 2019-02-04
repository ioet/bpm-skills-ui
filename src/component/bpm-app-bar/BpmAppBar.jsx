import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const BpmAppBar = props => (
  <AppBar position="sticky">
    <Toolbar>
      <Typography variant="h6" color="inherit">
        {props.title}
      </Typography>
    </Toolbar>
  </AppBar>
);

BpmAppBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default BpmAppBar;
