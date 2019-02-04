import { connect } from 'react-redux';
import { showDeleteDialog } from '../../delete-dialog/DeleteDialogActions';
import CategoryList from './CategoryList';

function compareCategoriesByFirstName(a, b) {
  if (a[1].toLowerCase() < b[1].toLowerCase()) {
    return -1;
  }
  if (a[1].toLowerCase() > b[1].toLowerCase()) {
    return 1;
  }
  return 0;
}

const validate = value => (value === null ? '' : value);

const convertToArray = (state, categoryList) => {
  const data = [];
  Object.keys(categoryList)
    .forEach((key) => {
      const category = categoryList[key];
      data.push([validate(category.id), validate(category.name), validate(category.business_value),
        validate(category.predictive_value), false, false]);
    });
  data.sort(compareCategoriesByFirstName);
  return data;
};

const mapStateToProps = state => ({
  categoryList: convertToArray(state, state.categoryList),
});

const mapDispatchToProps = dispatch => ({
  onRemoveCategories: (categoryIds) => {
    dispatch(showDeleteDialog(categoryIds));
  },
});

const CategoryListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryList);

export default CategoryListContainer;
