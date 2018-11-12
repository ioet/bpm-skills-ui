import React from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import SkillListContainer from './component/container/SkillListContainer';
import ErrorSnackbarContainer from './component/container/ErrorSnackbarContainer';
import Footer from './component/presentational/Footer';
import { AppConst } from './constants';
import FloatingActionButtonContainer from './component/container/FloatingActionButtonContainer';
import DeleteDialogContainer from './component/container/DeleteDialogContainer';

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
      <SkillListContainer />
      <Footer />
      <FloatingActionButtonContainer />
      <ErrorSnackbarContainer />
      <DeleteDialogContainer />
    </div>
  );
}

export default App;
