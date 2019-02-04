import axios from 'axios';

export const SKILLS = '/skills';
export const CATEGORIES = '/skills-categories';

class SkillsApi {
  constructor() {
    this.skillsApi = axios;
    this.skillsApi.defaults.baseURL = process.env.BPM_SKILLS_API_URL;
    this.skillsApi.defaults.headers.common['Content-Type'] = 'application/json';
  }

  getAllSkills() {
    return this.skillsApi.get(SKILLS);
  }

  createSkill(skill) {
    return this.skillsApi.post(SKILLS, skill);
  }

  updateSkill(skill) {
    return this.skillsApi.put(`${SKILLS}/${skill.id}`, skill);
  }

  deleteSkill(skillId) {
    return this.skillsApi.delete(`${SKILLS}/${skillId}`);
  }


  getAllCategories() {
    return this.skillsApi.get(CATEGORIES);
  }

  createCategory(category) {
    return this.skillsApi.post(CATEGORIES, category);
  }

  updateCategory(category) {
    return this.skillsApi.put(`${CATEGORIES}/${category.id}`, category);
  }

  deleteCategory(categoryId) {
    return this.skillsApi.delete(`${CATEGORIES}/${categoryId}`);
  }
}

export default SkillsApi;
