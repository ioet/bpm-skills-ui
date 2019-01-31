import { connect } from 'react-redux';
import DeleteDialog from './DeleteDialog';
import DeleteDialogConst from './DeleteDialogConstants';
import { hideDeleteDialog } from './DeleteDialogActions';

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

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleClose: (skills = []) => {
    dispatch(hideDeleteDialog());
    dispatch(ownProps.onConfirm(skills));
  },
});

const DeleteDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteDialog);

export default DeleteDialogContainer;
