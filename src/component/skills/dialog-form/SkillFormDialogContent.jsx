import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SkillFormDialogLabels, SkillFormDialogNames } from './SkillFormDialogConstants';
import { handleCloseFormDialog, setSkillEditData } from '../edit/EditSkillActions';
import CategorySelectContainer from '../category-select/CategorySelectContainer';
import BpmTextFieldContainer from '../../bpm-text-field/BpmTextFieldContainer';
import { getCurrentEditSkill } from '../edit/EditSkillSelector';

const mapStateToProps = state => ({
  skill: getCurrentEditSkill(state),
});

const SkillFormDialogContent = (props) => {
  const { skill } = props;
  return (
    <Fragment>
      <BpmTextFieldContainer
        name={SkillFormDialogNames.SKILL_NAME}
        label={SkillFormDialogLabels.SKILL_NAME_LABEL}
        value={skill.name}
        onInputChange={setSkillEditData}
      />
      <BpmTextFieldContainer
        name={SkillFormDialogNames.SKILL_LABEL}
        label={SkillFormDialogLabels.SKILL_LABEL_LABEL}
        value={skill.label}
        onInputChange={setSkillEditData}
      />
      <CategorySelectContainer onCategoryChange={setSkillEditData} name={SkillFormDialogNames.SKILL_CATEGORY} />
      <BpmTextFieldContainer
        name={SkillFormDialogNames.SKILL_BUSINESS_VALUE}
        label={SkillFormDialogLabels.SKILL_BUSINESS_VALUE_LABEL}
        value={skill.business_value}
        onInputChange={setSkillEditData}
      />
      <form onSubmit={(e) => {
        e.preventDefault();
        handleCloseFormDialog(true);
      }}
      >
        <BpmTextFieldContainer
          name={SkillFormDialogNames.SKILL_PREDICTIVE_VALUE}
          label={SkillFormDialogLabels.SKILL_PREDICTIVE_VALUE_LABEL}
          value={skill.predictive_value}
          onInputChange={setSkillEditData}
        />
      </form>
    </Fragment>
  );
};

SkillFormDialogContent.propTypes = {
  skill: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(SkillFormDialogContent);
