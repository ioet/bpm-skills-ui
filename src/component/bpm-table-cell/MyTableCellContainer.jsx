import { connect } from 'react-redux';
import MyTableCell from './MyTableCell';
import { hoverOut, hoverOver } from '../hover/HoverActions';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onMouseOver: () => {
    dispatch(hoverOver(ownProps.skillId));
  },
  onMouseOut: () => {
    dispatch(hoverOut());
  },
});

const MyTableCellContainer = connect(
  null,
  mapDispatchToProps,
)(MyTableCell);

export default MyTableCellContainer;
