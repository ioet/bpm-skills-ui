import React from 'react';
import { connect } from 'react-redux';
import { Edit } from '@material-ui/icons';
import { getHoverId, isHoverActive } from '../../hover/HoverSelector';
import BpmIconButton from '../../bpm-buttons/BpmIconButton';
import { editSkill } from '../edit/EditSkillActions';
import { EDIT } from './SkillListConstants';

const mapStateToProps = state => ({
  hover: isHoverActive(state),
  hoverId: getHoverId(state),
  icon: <Edit />,
  tooltip: EDIT,
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
