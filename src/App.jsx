import React from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import SkillListContainer from './component/skills/list/SkillListContainer';
import NotificationContainer from './component/bpm-notification/NotificationContainer';
import Footer from './component/bpm-footer/Footer';
import { AppConstants } from './AppConstants';
import DeleteDialogContainer from './component/delete-dialog/DeleteDialogContainer';
import NewSkillButtonContainer from './component/skills/create/NewSkillButtonContainer';
import { startCreateSkill } from './component/skills/edit/EditSkillActions';
import SkillFormDialogContainer from './component/skills/dialog-form/SkillFormDialogContainer';

function App() {
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            {AppConstants.APP_TITLE}
          </Typography>
        </Toolbar>
      </AppBar>
      <NewSkillButtonContainer onClickCallback={startCreateSkill} />
      <SkillListContainer />
      <Footer />
      <NotificationContainer />
      <DeleteDialogContainer />
      <SkillFormDialogContainer />
    </div>
  );
}

export default App;
