import {connect} from 'react-redux';
import React from 'react';
import EditCategory from '../presentational/EditCategory';
import {setSkillEditData} from "../../actions";

const mapStateToProps = (state, ownProps) => ({
  inputError: state.inputError[ownProps.name],
  skillId: ownProps.skillId,
  value: ownProps.value,
  name: ownProps.name,
  label: ownProps.label,
  
});

const mapDispatchToProps = dispatch => ({
  onCategoryChange: (event) => {
    dispatch(setSkillEditData(event.target.name, event.target.value));
  }
});

const EditCategoryContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(EditCategory);

export default EditCategoryContainer;