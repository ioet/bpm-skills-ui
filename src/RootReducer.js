import { combineReducers } from 'redux';
import skillList from './component/skills/SkillReducer';
import hover from './component/hover/HoverReducer';
import message from './component/bpm-notification/NotificationReducer';
import skillEdit from './component/skills/edit/EditSkillReducer';
import inputError from './component/bpm-text-field/BpmTextFieldReducer';
import categoryList from './component/categories/CategoriesReducer';
import deleteReducer from './component/delete-dialog/DeleteDialogReducers';
import categoryEdit from './component/categories/edit/EditCategoryReducer';

const rootReducer = combineReducers({
  skillList,
  categoryList,
  message,
  inputError,
  skillEdit,
  categoryEdit,
  deleteReducer,
  hover,
});

export default rootReducer;
