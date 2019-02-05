import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DialogContentText from '@material-ui/core/DialogContentText';
import DeleteDialogConst from '../../delete-dialog/DeleteDialogConstants';
import { getSkillNameToDelete } from '../../delete-dialog/DeleteDialogSelector';

const mapStateToProps = state => ({
  skillName: getSkillNameToDelete(state),
});

const DeleteSkillDialogContent = props => (
  <DialogContentText>
    {DeleteDialogConst.CONTENT_TEXT_1}
    <b>
      {props.skillName}
    </b>
    {DeleteDialogConst.CONTENT_TEXT_2}
  </DialogContentText>
);

DeleteSkillDialogContent.propTypes = {
  skillName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(DeleteSkillDialogContent);
