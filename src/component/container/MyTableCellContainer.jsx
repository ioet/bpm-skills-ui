import { connect } from 'react-redux';
import { hoverOut, hoverOver } from '../../actions';
import MyTableCell from '../presentational/MyTableCell';

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
