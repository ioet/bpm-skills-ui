import { createMuiTheme } from '@material-ui/core';
import { red, amber } from '@material-ui/core/colors';

const RootTheme = createMuiTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: amber[500],
    },
  },
  typography: {
    useNextVariants: true,
  },
  overrides: {
    MuiTableCell: {
      root: {
        maxWidth: '140px',
      },
      body: {
        padding: '0',
      },
    },
    MuiCheckbox: {
      checked: {
        color: `${amber.A400} !important`,
      },
    },
    MUIDataTableToolbar: {
      icon: {
        '&:hover': {
          color: amber['500'],
        },
      },
    },
  },
});

export default RootTheme;
