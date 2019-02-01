import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import { connect } from 'react-redux';
import DeleteDialogConst from './DeleteDialogConstants';
import { handleCloseDeleteDialog, hideDeleteDialog } from './DeleteDialogActions';
import { getSkillNameToDelete } from './DeleteDialogSelector';
import BpmDialog from '../bpm-dialog/BpmDialog';

const getChildren = skillName => (
  <DialogContentText id="alert-dialog-slide-description">
    {DeleteDialogConst.CONTENT_TEXT_1}
    <b>
      {skillName}
    </b>
    {DeleteDialogConst.CONTENT_TEXT_2}
  </DialogContentText>
);

const mapStateToProps = state => ({
  open: state.skillDelete.open,
  children: getChildren(getSkillNameToDelete(state)),
  dialogTitle: DeleteDialogConst.TITLE,
  positiveButtonLabel: DeleteDialogConst.AGREE,
});

const mapDispatchToProps = dispatch => ({
  handleClose: (confirmed) => {
    dispatch(handleCloseDeleteDialog(confirmed));
    dispatch(hideDeleteDialog());
  },
});

const DeleteDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BpmDialog);

export default DeleteDialogContainer;
