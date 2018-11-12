import { connect } from 'react-redux';
import { Done, Edit } from '@material-ui/icons';
import React from 'react';
import MyIconButton from '../presentational/MyIconButton';
import { editUpdateOrCreateSkill } from '../../actions';
import { SkillListItemConst } from '../../constants';

const mapStateToProps = (state, ownProps) => ({
  hover: state.hover.hover,
  hoverId: state.hover.id,
  icon: (state.skillEdit.id === ownProps.skillId) ? <Done /> : <Edit />,
  tooltip: (state.skillEdit.id === ownProps.skillId)
    ? SkillListItemConst.TOOLTIP_SAVE
    : SkillListItemConst.TOOLTIP_EDIT,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClickCallback: () => {
    dispatch(editUpdateOrCreateSkill(ownProps.skillId));
  },
});

const MyEditButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyIconButton);

export default MyEditButtonContainer;
