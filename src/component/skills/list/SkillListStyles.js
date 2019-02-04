import { deepPurple } from '@material-ui/core/colors';

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
