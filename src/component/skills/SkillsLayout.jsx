import React, { Fragment } from 'react';
import { startCreateSkill } from './edit/EditSkillActions';
import SkillListContainer from './list/SkillListContainer';
import SkillFormDialogContainer from './dialog-form/SkillFormDialogContainer';
import DeleteDialogContainer from '../delete-dialog/DeleteDialogContainer';
import NewSkillButtonContainer from './create/NewSkillButtonContainer';
import LinkToCategories from './LinkToCategories';
import BpmAppBar from '../bpm-app-bar/BpmAppBar';
import { AppConstants } from '../../AppConstants';
import DeleteSkillDialogContent from './delete/DeleteSkillDialogContent';
import { removeSkills } from './delete/DeleteSkillActions';
import SkillFormDialogContent from './dialog-form/SkillFormDialogContent';

const SkillsLayout = () => (
  <Fragment>
    <BpmAppBar title={AppConstants.TITLE_SKILLS} />
    <NewSkillButtonContainer onClickCallback={startCreateSkill} />
    <LinkToCategories />
    <SkillListContainer />
    <DeleteDialogContainer onConfirm={removeSkills}>
      <DeleteSkillDialogContent />
    </DeleteDialogContainer>
    <SkillFormDialogContainer>
      <SkillFormDialogContent />
    </SkillFormDialogContainer>
  </Fragment>
);

export default SkillsLayout;
