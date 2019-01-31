import React from 'react';
import { connect } from 'react-redux';
import { Edit } from '@material-ui/icons';
import { getHoverId, isHoverActive } from '../hover/hover-selector';
import { editUpdateOrCreateSkill } from '../../actions';
import BpmIconButton from './BpmIconButton';

const mapStateToProps = state => ({
  hover: isHoverActive(state),
  hoverId: getHoverId(state),
  icon: <Edit />,
  tooltip: 'Edit',
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClickCallback: () => {
    dispatch(editUpdateOrCreateSkill(ownProps.itemId));
  },
});

const BpmEditButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BpmIconButton);

export default BpmEditButtonContainer;
