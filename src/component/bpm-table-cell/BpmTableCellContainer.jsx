import { connect } from 'react-redux';
import MyTableCell from './BpmTableCell';
import { hoverOut, hoverOver } from '../hover/HoverActions';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onMouseOver: () => {
    dispatch(hoverOver(ownProps.skillId));
  },
  onMouseOut: () => {
    dispatch(hoverOut());
  },
});

const BpmTableCellContainer = connect(
  null,
  mapDispatchToProps,
)(MyTableCell);

export default BpmTableCellContainer;
