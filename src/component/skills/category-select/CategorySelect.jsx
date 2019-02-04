import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { SkillFormDialogLabels } from '../dialog-form/SkillFormDialogConstants';
import CategorySelectStyles from './CategorySelectStyles';

const mapCategoriesIntoSelect = (categories) => {
  const items = [];
  Object.keys(categories)
    .forEach((key) => {
      const c = categories[key];
      items.push(
        <MenuItem key={c.id} value={c.id}>
          {c.name}
        </MenuItem>,
      );
    });
  return items;
};

const CategorySelect = (props) => {
  const {
    classes, selection, categories, onCategorySelectionChange,
  } = props;
  return (
    <FormControl className={classes.categorySelect}>
      <InputLabel htmlFor="category">
        {SkillFormDialogLabels.SKILL_CATEGORY_LABEL}
      </InputLabel>
      <Select
        margin="dense"
        value={selection}
        onChange={onCategorySelectionChange}
        inputProps={{
          name: 'category_id',
          id: 'category',
        }}
        fullWidth
      >
        {mapCategoriesIntoSelect(categories)}
      </Select>
    </FormControl>
  );
};

CategorySelect.defaultProps = {
  categories: {},
  selection: '',
};

CategorySelect.propTypes = {
  classes: PropTypes.object.isRequired,
  selection: PropTypes.string,
  categories: PropTypes.object.isRequired,
  onCategorySelectionChange: PropTypes.func.isRequired,
};

export default withStyles(CategorySelectStyles)(CategorySelect);
