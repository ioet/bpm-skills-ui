import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import PropTypes from 'prop-types';
import { NotificationConst } from './NotificationConstants';
import { NotificationStyles } from './NotificationStyles';

const Notification = (props) => {
  const {
    classes, open, handleClose, message,
  } = props;

  return (
    <Snackbar
      className={classes.snackbar}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={NotificationConst.AUTO_HIDE_DURATION}
      onClose={handleClose}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={(
        <span id="message-id">
          {message}
        </span>
      )}
    />
  );
};

Notification.defaultProps = {
  message: '',
};

Notification.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  message: PropTypes.string,
};

export default withStyles(NotificationStyles)(Notification);
