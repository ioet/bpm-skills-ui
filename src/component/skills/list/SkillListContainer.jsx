import { connect } from 'react-redux';
import SkillList from './SkillList';
import { showDeleteDialog } from '../../delete-dialog/DeleteDialogActions';
import { getCategoryNameById } from '../../categories/CategorySelector';

function compareSkillsByFirstName(a, b) {
  if (a[1].toLowerCase() < b[1].toLowerCase()) {
    return -1;
  }
  if (a[1].toLowerCase() > b[1].toLowerCase()) {
    return 1;
  }
  return 0;
}

const validate = value => (value === null ? '' : value);

const convertToArray = (state, skillList) => {
  const data = [];
  Object.keys(skillList)
    .forEach((key) => {
      const skill = skillList[key];
      data.push([validate(skill.id), validate(skill.name), validate(skill.label),
        validate(getCategoryNameById(state, skill.category_id)),
        validate(skill.business_value), validate(skill.predictive_value), false, false]);
    });
  data.sort(compareSkillsByFirstName);
  return data;
};

const mapStateToProps = state => ({
  skillList: convertToArray(state, state.skillList),
});

const mapDispatchToProps = dispatch => ({
  onRemoveSkills: (skillIds) => {
    dispatch(showDeleteDialog(skillIds));
  },
});

const SkillListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SkillList);

export default SkillListContainer;
