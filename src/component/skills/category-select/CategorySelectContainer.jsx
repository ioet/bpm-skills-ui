import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CategorySelect from './CategorySelect';
import { getCategoryList } from '../../categories/CategorySelector';
import { getCurrentEditSkillCategory } from '../edit/EditSkillSelector';
import { getInputError } from '../../bpm-text-field/BpmTextFieldSelector';

const mapStateToProps = (state, ownProps) => ({
  categories: getCategoryList(state),
  selection: getCurrentEditSkillCategory(state),
  error: getInputError(state, ownProps.name),
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

CategorySelectContainer.propTypes = {
  name: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

export default CategorySelectContainer;
