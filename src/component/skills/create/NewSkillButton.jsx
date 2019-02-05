import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { NEW_SKILL_LABEL } from './NewSkillConstants';

const NewSkillButton = (props) => {
  const { onClickCallback } = props;

  return (
    <Button
      color="primary"
      onClick={(e) => {
        e.preventDefault();
        onClickCallback();
      }}
    >
      {NEW_SKILL_LABEL}
    </Button>
  );
};


NewSkillButton.propTypes = {
  onClickCallback: PropTypes.func.isRequired,
};

export default NewSkillButton;
