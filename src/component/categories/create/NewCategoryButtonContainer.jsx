import { connect } from 'react-redux';
import NewSkillButton from './NewCategoryButton';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClickCallback: () => {
    dispatch(ownProps.onClickCallback());
  },
});

const NewCategoryButtonContainer = connect(
  null,
  mapDispatchToProps,
)(NewSkillButton);

export default NewCategoryButtonContainer;
