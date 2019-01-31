export const InputErrorAction = {
  ADD: 'ERROR_ADD',
  REMOVE_ALL: 'ERROR_REMOVE_ALL',
};

export const setInputError = field => ({
  type: InputErrorAction.ADD,
  field,
});

export const removeAllInputErrors = () => ({
  type: InputErrorAction.REMOVE_ALL,
});
