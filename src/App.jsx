import React from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import SkillListContainer from './component/skills/list/SkillListContainer';
import ErrorSnackbarContainer from './component/container/ErrorSnackbarContainer';
import Footer from './component/presentational/Footer';
import { AppConst } from './constants';
import DeleteDialogContainer from './component/delete-dialog/DeleteDialogContainer';
import { removeSkills } from './component/delete-dialog/DeleteDialogActions';
import NewSkillButtonContainer from './component/skills/create/NewSkillButtonContainer';
import { startCreateSkill } from './component/skills/edit/EditSkillActions';
import SkillFormDialogContainer from './component/skills/dialog-form/SkillFormDialogContainer';

function App() {
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            {AppConst.APP_TITLE}
          </Typography>
        </Toolbar>
      </AppBar>
      <NewSkillButtonContainer onClickCallback={startCreateSkill} />
      <SkillListContainer />
      <Footer />
      <ErrorSnackbarContainer />
      <DeleteDialogContainer onConfirm={removeSkills} />
      <SkillFormDialogContainer />
    </div>
  );
}

export default App;
