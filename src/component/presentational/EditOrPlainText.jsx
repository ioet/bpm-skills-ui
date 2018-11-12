import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField/TextField';

const EditOrPlainText = (props) => {
  const {
    value, editId, skillId, inputError, onSkillEdit, onChange, name, label,
  } = props;

  return (
    (editId === skillId)
      ? (
        <form onSubmit={(e) => {
          e.preventDefault();
          onSkillEdit();
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
                onChange(e, editId);
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
};

EditOrPlainText.propTypes = {
  value: PropTypes.string.isRequired,
  editId: PropTypes.string.isRequired,
  skillId: PropTypes.string.isRequired,
  inputError: PropTypes.bool,
  onSkillEdit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default EditOrPlainText;
