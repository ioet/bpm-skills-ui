import { connect } from 'react-redux';
import DeleteDialog from '../presentational/DeleteDialog';
import { hideDeleteDialog, removeCategoryAsync } from '../../actions';
import { getCategoryIds, getCategoryName, isDeleteDialogOpen } from '../../selectors';

const mapStateToProps = state => ({
  open: isDeleteDialogOpen(state),
  categoryIds: getCategoryIds(state),
  categoryName: getCategoryName(state),
});

const mapDispatchToProps = dispatch => ({
  handleClose: (categories = []) => {
    dispatch(hideDeleteDialog());
    categories.forEach(u => dispatch(removeCategoryAsync(u)));
  },
});

const DeleteDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteDialog);

export default DeleteDialogContainer;
