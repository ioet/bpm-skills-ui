import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Edit } from '@material-ui/icons';
import { getHoverId, isHoverActive } from '../hover/HoverSelector';
import BpmIconButton from './BpmIconButton';
import { EDIT } from './BpmIconButtonConstants';

const mapStateToProps = state => ({
  hover: isHoverActive(state),
  hoverId: getHoverId(state),
  icon: <Edit />,
  tooltip: EDIT,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClickCallback: () => {
    dispatch(ownProps.onEdit(ownProps.itemId));
  },
});

const BpmEditButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BpmIconButton);

BpmEditButtonContainer.propTypes = {
  onEdit: PropTypes.func.isRequired,
};

export default BpmEditButtonContainer;
