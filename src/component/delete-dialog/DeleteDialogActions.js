export const DeleteAction = {
  SHOW_DIALOG: 'SHOW_DIALOG',
  HIDE_DIALOG: 'HIDE_DIALOG',
};

export const showDeleteDialog = ids => ({
  type: DeleteAction.SHOW_DIALOG,
  open: true,
  ids,
});

export const hideDeleteDialog = () => ({
  type: DeleteAction.HIDE_DIALOG,
  open: false,
});

export const handleCloseDeleteDialog = (confirmed, onConfirm) => ((dispatch) => {
  if (confirmed) {
    dispatch(onConfirm());
  }
  dispatch(hideDeleteDialog());
});
