import React from 'react';
import TextField from 'material-ui/TextField';

const ReadOnlyDataField = (props) => {
  const { displayName,
    docField, // eslint-disable-line no-unused-vars
    value,
    onChange, isRequired, // eslint-disable-line no-unused-vars
    ...other } = props;
  const disabled = true;
  return (
    <TextField
      value={value || ''}
      fullWidth
      disabled={disabled}
      floatingLabelText={displayName}
      {...other}
    />
  );
};

ReadOnlyDataField.propTypes = {
  displayName: React.PropTypes.string,
  docField: React.PropTypes.string,
  value: React.PropTypes.any,
  onChange: React.PropTypes.func,
};

export default ReadOnlyDataField;
