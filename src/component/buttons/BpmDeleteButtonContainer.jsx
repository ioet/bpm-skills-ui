import React from 'react';
import { connect } from 'react-redux';
import { Delete } from '@material-ui/icons';
import BpmIconButton from './BpmIconButton';
import { getHoverId, isHoverActive } from '../hover/HoverSelector';
import { showDeleteDialog } from '../delete-dialog/DeleteDialogActions';

const mapStateToProps = state => ({
  hover: isHoverActive(state),
  hoverId: getHoverId(state),
  icon: <Delete />,
  tooltip: 'Delete',
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClickCallback: () => {
    dispatch(showDeleteDialog([ownProps.itemId]));
  },
});

const BpmDeleteButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BpmIconButton);

export default BpmDeleteButtonContainer;
