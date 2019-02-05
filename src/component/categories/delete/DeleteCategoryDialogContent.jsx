import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DialogContentText from '@material-ui/core/DialogContentText';
import DeleteDialogConst from '../../delete-dialog/DeleteDialogConstants';
import { getCategoryNameToDelete } from '../../delete-dialog/DeleteDialogSelector';

const mapStateToProps = state => ({
  categoryName: getCategoryNameToDelete(state),
});

const DeleteCategoryDialogContent = props => (
  <DialogContentText>
    {DeleteDialogConst.CONTENT_TEXT_1}
    <b>
      {props.categoryName}
    </b>
    {DeleteDialogConst.CONTENT_TEXT_2}
  </DialogContentText>
);

DeleteCategoryDialogContent.propTypes = {
  categoryName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(DeleteCategoryDialogContent);
