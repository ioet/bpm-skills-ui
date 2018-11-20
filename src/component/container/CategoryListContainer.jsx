import { connect } from 'react-redux';
import CategoryList from '../presentational/CategoryList';
import { showDeleteDialog } from '../../actions';
import { getCategoryList } from '../../selectors';

const mapStateToProps = state => ({
  categoryList: getCategoryList(state),
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
