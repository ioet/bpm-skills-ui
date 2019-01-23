import React from 'react';
import PropTypes from 'prop-types';
import {CategoryStyles} from '../../styles'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem';
import withStyles from "@material-ui/core/es/styles/withStyles";
import {Variable} from "../../constants";


const EditCategory = (props) => {
  const {
    onCategoryChange, value,
  } = props;
  return (
      <Select
          name={Variable.CATEGORY}
          onChange={onCategoryChange}
          value={value}
      >
        <MenuItem value={"skill one"}>Skill One</MenuItem>
        <MenuItem value={"skill two"}>Skill Two</MenuItem>
        <MenuItem value={"skill three"}>Skill Three</MenuItem>
      </Select>
  )
};

EditCategory.propTypes = {
  onCategoryChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default withStyles(CategoryStyles)(EditCategory);
