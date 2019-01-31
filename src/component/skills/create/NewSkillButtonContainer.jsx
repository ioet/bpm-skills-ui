import { connect } from 'react-redux';
import NewSkillButton from './NewSkillButton';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClickCallback: () => {
    dispatch(ownProps.onClickCallback());
  },
});

const NewSkillButtonContainer = connect(
  null,
  mapDispatchToProps,
)(NewSkillButton);

export default NewSkillButtonContainer;
