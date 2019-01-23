import {connect} from 'react-redux';
import SkillList from '../presentational/SkillList';
import {showDeleteDialog} from '../../actions';

const mapStateToProps = state => ({
  skillList: state.skillList,
});

const mapDispatchToProps = dispatch => ({
  onRemoveSkills: (skillIds) => {
    dispatch(showDeleteDialog(skillIds));
  }
});

const SkillListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SkillList);

export default SkillListContainer;
