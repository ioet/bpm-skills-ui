export const getCurrentEditSkill = state => state.skillEdit.skill;

export const getCurrentEditSkillCategory = state => state.skillEdit.skill.category_id;

export const isSkillDialogFormOpen = state => state.skillEdit.editing;

export const isSkillCreation = state => typeof state.skillEdit.skill.id === 'undefined';
