import axios from 'axios';

export const SKILLS = '/skills';
export const CATEGORIES = '/skills';

class SkillsApi {
  constructor() {
    this.skillsApi = axios;
    this.skillsApi.defaults.baseURL = process.env.BPM_SKILLS_API_URL;
    this.skillsApi.defaults.headers.common['Content-Type'] = 'application/json';
  }

  createSkill(skill) {
    return this.skillsApi.post(SKILLS, skill);
  }

  deleteSkill(skillId) {
    return this.skillsApi.delete(`${SKILLS}/${skillId}`);
  }
}

export default SkillsApi;
