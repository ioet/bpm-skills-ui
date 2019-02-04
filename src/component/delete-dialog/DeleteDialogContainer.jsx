import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DeleteDialogConst from './DeleteDialogConstants';
import { handleCloseDeleteDialog } from './DeleteDialogActions';
import BpmDialog from '../bpm-dialog/BpmDialog';
import { isDialogOpen } from './DeleteDialogSelector';

const mapStateToProps = state => ({
  open: isDialogOpen(state),
  dialogTitle: DeleteDialogConst.TITLE,
  positiveButtonLabel: DeleteDialogConst.AGREE,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleClose: (confirmed) => {
    dispatch(handleCloseDeleteDialog(confirmed, ownProps.onConfirm));
  },
});

const DeleteDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BpmDialog);

DeleteDialogContainer.propTypes = {
  onConfirm: PropTypes.func.isRequired,
};

export default DeleteDialogContainer;
