import { connect } from 'react-redux';
import { Add, Clear } from '@material-ui/icons';
import React from 'react';
import { startOrEndCreateSkill } from '../../actions';
import FloatingActionButton from '../presentational/FloatingActionButton';
import { FloatingActionButtonConst } from '../../constants';

const mapStateToProps = state => ({
  tooltip: (state.skillEdit.editing)
    ? FloatingActionButtonConst.TOOLTIP_DISCARD
    : FloatingActionButtonConst.TOOLTIP_ADD,
  icon: (state.skillEdit.editing) ? <Clear /> : <Add />,
});

const mapDispatchToProps = dispatch => ({
  createSkill: () => {
    dispatch(startOrEndCreateSkill());
  },
});

const FloatingActionButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FloatingActionButton);

export default FloatingActionButtonContainer;
