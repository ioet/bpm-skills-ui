import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField/TextField';

const EditOrPlainText = (props) => {
  const {
    value, editId, categoryId, inputError, onCategoryEdit, onChange, name, label,
  } = props;

  return (
    (editId === categoryId)
      ? (
        <form onSubmit={(e) => {
          e.preventDefault();
          onCategoryEdit();
        }}
        >
          <TextField
            error={inputError}
            name={name}
            defaultValue={value}
            label={label}
            id="mui-theme-provider-input"
            onChange={
              (e) => {
                e.preventDefault();
                onChange(e);
              }
            }
          />
        </form>
      ) : (
        value
      )
  );
};

EditOrPlainText.defaultProps = {
  inputError: false,
  editId: undefined,
};

EditOrPlainText.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  editId: PropTypes.string,
  categoryId: PropTypes.string.isRequired,
  inputError: PropTypes.bool,
  onCategoryEdit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default EditOrPlainText;
