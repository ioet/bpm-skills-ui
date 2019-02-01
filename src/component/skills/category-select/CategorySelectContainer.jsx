import { connect } from 'react-redux';
import CategorySelect from './CategorySelect';
import { getCategoryList } from '../../categories/CategorySelector';
import { getCurrentEditSkillCategory } from '../edit/EditSkillSelector';

const mapStateToProps = state => ({
  categories: getCategoryList(state),
  selection: getCurrentEditSkillCategory(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onCategorySelectionChange: (event) => {
    dispatch(ownProps.onCategoryChange(event.target.name, event.target.value));
  },
});

const CategorySelectContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategorySelect);

export default CategorySelectContainer;
