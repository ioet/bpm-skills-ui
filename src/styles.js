import { createMuiTheme } from '@material-ui/core';
import { amber, deepPurple } from '@material-ui/core/colors';

export const RootTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#e53935',
    },
    secondary: {
      main: '#2196f3',
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
          color: deepPurple['500'],
        },
      },
    },
  },
});

export const FabStyles = () => ({
  fab: {
    position: 'fixed',
    bottom: '3%',
    right: '5%',
  },
});

export const SnackbarStyles = theme => ({
  snackbar: {
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing.unit * 3,
    },
  },
});

export const FooterStyles = theme => ({
  root: {
    width: '90%',
    margin: 'auto',
    padding: theme.spacing.unit * 1,
  },
  button: {
    margin: theme.spacing.unit * 1,
  },
});

export const SkillListStyles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 1,
    width: '90%',
    margin: 'auto',
  },
  iconButton: {
    width: theme.spacing.unit * 6,
    height: theme.spacing.unit * 6,
    top: '50%',
    display: 'block',
    position: 'relative',
    transform: 'translateY(-50%)',
    marginRight: theme.spacing.unit * 3,
    '&:hover': {
      color: deepPurple['500'],
    },
  },
});

export const MyIconButtonStyles = () => ({
  hide: {
    visibility: 'hidden',
  },
  show: {
    visibility: 'visible',
  },
});

export const TableCellStyles = theme => ({
  cell: {
    height: 'auto',
    lineHeight: theme.spacing.unit / 2,
    verticalAlign: 'middle',
    paddingTop: theme.spacing.unit / 2,
    paddingBottom: theme.spacing.unit / 2,
    paddingLeft: theme.spacing.unit * 3,
  },
});
