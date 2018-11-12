import { connect } from 'react-redux';
import DeleteDialog from '../presentational/DeleteDialog';
import { hideDeleteDialog, removeSkillAsync } from '../../actions';
import { DeleteDialogConst } from '../../constants';

const mapStateToProps = (state) => {
  const { skillIds } = state.skillDelete;
  let skillName = '';
  if (typeof skillIds !== 'undefined') {
    skillName = (skillIds.length > 1)
      ? skillIds.length + DeleteDialogConst.CONTENT_TEXT_MULTI_SKILL
      : state.skillList[skillIds].name;
  }
  return {
    open: state.skillDelete.open,
    skillIds,
    skillName,
  };
};

const mapDispatchToProps = dispatch => ({
  handleClose: (skills = []) => {
    dispatch(hideDeleteDialog());
    skills.forEach(u => dispatch(removeSkillAsync(u)));
  },
});

const DeleteDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteDialog);

export default DeleteDialogContainer;
