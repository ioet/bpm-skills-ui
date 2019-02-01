import DeleteDialogConst from './DeleteDialogConstants';

export const getSkillNameToDelete = (state) => {
  const { skillIds } = state.skillDelete;
  let skillName = '';
  if (typeof skillIds !== 'undefined') {
    skillName = (skillIds.length > 1)
      ? skillIds.length + DeleteDialogConst.CONTENT_TEXT_MULTI_SKILL
      : state.skillList[skillIds].name;
  }
  return skillName;
};

export const getSkillIdsToDelete = state => state.skillDelete.skillIds;
