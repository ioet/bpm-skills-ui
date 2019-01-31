import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Button } from '@material-ui/core';
import { NEW_SKILL_LABEL } from './NewSkillConstants';
import NewSkillButtonStyles from './NewSkillButtonStyles';

const NewSkillButton = (props) => {
  const { classes, onClickCallback } = props;

  return (
    <Button
      color="primary"
      onClick={(e) => {
        e.preventDefault();
        onClickCallback();
      }}
      className={classes.newSkillButton}
    >
      {NEW_SKILL_LABEL}
    </Button>
  );
};


NewSkillButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onClickCallback: PropTypes.func.isRequired,
};

export default withStyles(NewSkillButtonStyles)(NewSkillButton);
