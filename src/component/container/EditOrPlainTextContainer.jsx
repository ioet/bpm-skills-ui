import { connect } from 'react-redux';
import { editUpdateOrCreateSkill, setSkillEditData } from '../../actions';
import EditOrPlainText from '../presentational/EditOrPlainText';

const mapStateToProps = (state, ownProps) => ({
  editId: (typeof state.skillEdit.id === 'undefined') ? '' : state.skillEdit.id,
  inputError: state.inputError[ownProps.name],
  skillId: ownProps.skillId,
  value: ownProps.value,
  name: ownProps.name,
  label: ownProps.label,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSkillEdit: () => {
    dispatch(editUpdateOrCreateSkill(ownProps.skillId));
  },
  onChange: (event) => {
    dispatch(setSkillEditData(event.target.name, event.target.value));
  },
});

const EditOrPlainTextContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditOrPlainText);

export default EditOrPlainTextContainer;
