import { DeleteAction } from './DeleteDialogActions';

const deleteReducer = (state = { open: false }, action) => {
  switch (action.type) {
    case DeleteAction.SHOW_DIALOG:
      return {
        open: true,
        ids: action.ids,
      };
    case DeleteAction.HIDE_DIALOG:
      return {
        open: false,
      };
    default:
      return state;
  }
};


export default deleteReducer;
