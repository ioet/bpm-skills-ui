import { connect } from 'react-redux';
import ErrorSnackbar from './Notification';
import { hideMessage } from './NotificationActions';

const mapStateToProps = state => ({
  open: state.message.open,
  message: state.message.message,
});

const mapDispatchToProps = dispatch => ({
  handleClose: () => {
    dispatch(hideMessage());
  },
});

const NotificationContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorSnackbar);

export default NotificationContainer;
