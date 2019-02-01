import React from 'react';
import { connect } from 'react-redux';
import { Edit } from '@material-ui/icons';
import { getHoverId, isHoverActive } from '../hover/HoverSelector';
import BpmIconButton from './BpmIconButton';
import { editSkill } from '../skills/edit/EditSkillActions';

const mapStateToProps = state => ({
  hover: isHoverActive(state),
  hoverId: getHoverId(state),
  icon: <Edit />,
  tooltip: 'Edit',
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClickCallback: () => {
    dispatch(editSkill(ownProps.itemId));
  },
});

const BpmEditButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BpmIconButton);

export default BpmEditButtonContainer;
