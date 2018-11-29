import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import withStyles from '@material-ui/core/styles/withStyles';
import { TooltipConst } from '../../constants';
import { MyIconButtonStyles } from '../../styles';

const MyIconButton = (props) => {
  const {
    classes, skillId, onClickCallback, icon, tooltip, hover, hoverId,
  } = props;
  const showItem = (hover && hoverId === skillId) ? classes.show : classes.hide;

  return (
    <div>
      <Tooltip
        title={tooltip}
        placement="left"
        enterDelay={TooltipConst.ENTER_DELAY}
        leaveDelay={TooltipConst.LEAVE_DELAY}
      >
        <IconButton
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            onClickCallback(skillId);
          }}
          className={showItem}
        >
          {icon}
        </IconButton>
      </Tooltip>
    </div>
  );
};

MyIconButton.defaultProps = {
  hoverId: '',
};

MyIconButton.propTypes = {
  classes: PropTypes.object.isRequired,
  skillId: PropTypes.string.isRequired,
  onClickCallback: PropTypes.func.isRequired,
  icon: PropTypes.element.isRequired,
  tooltip: PropTypes.string.isRequired,
  hover: PropTypes.bool.isRequired,
  hoverId: PropTypes.string,
};

export default withStyles(MyIconButtonStyles)(MyIconButton);
