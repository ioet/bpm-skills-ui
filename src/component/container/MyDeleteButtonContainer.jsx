import { connect } from 'react-redux';
import { Clear, Delete } from '@material-ui/icons';
import React from 'react';
import MyIconButton from '../presentational/MyIconButton';
import { clearOrShowDelete } from '../../actions';
import { SkillListItemConst } from '../../constants';

const mapStateToProps = (state, ownProps) => ({
  hover: state.hover.hover,
  hoverId: state.hover.id,
  icon: (state.skillEdit.id === ownProps.skillId) ? <Clear /> : <Delete />,
  tooltip: (state.skillEdit.id === ownProps.skillId)
    ? SkillListItemConst.TOOLTIP_DISCARD
    : SkillListItemConst.TOOLTIP_DELETE,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClickCallback: () => {
    dispatch(clearOrShowDelete([ownProps.skillId]));
  },
});

const MyDeleteButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyIconButton);

export default MyDeleteButtonContainer;
