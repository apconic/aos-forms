import React from 'react';
import TextField from 'material-ui/TextField';
import { trim, isNull, isUndefined } from 'lodash';
import Field from './field';

export default class TextDataField extends Field {
  constructor(props) {
    super(props);
    this.onTextChange = this.onTextChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onBlur(event) {
    const { onChange, docField, onBlurred } = this.props;
    const textFieldValue = trim(event.target.value);
    if (onBlurred) {
      onBlurred(docField, textFieldValue);
      return;
    }
    onChange(docField, textFieldValue);
  }

  onTextChange(event) {
    const { onChange, docField } = this.props;
    event.preventDefault();
    const textFieldValue = event.target.value;
    onChange(docField, textFieldValue);
  }

  validateText(text) {
    try {
      this.checkMandatory(text);
      this.checkValidation(text);
      this.checkRegex(text);
    } catch (error) {
      this.fieldIsInvalid();
      return error.message;
    }
    this.fieldIsValid();
    return '';
  }

  render() {
    const { displayName,
            onChange, // eslint-disable-line no-unused-vars
            value,
            docField, // eslint-disable-line no-unused-vars
            isRequired, // eslint-disable-line no-unused-vars
            validatorType, // eslint-disable-line no-unused-vars
            onInvalid, // eslint-disable-line no-unused-vars
            onBlurred, // eslint-disable-line no-unused-vars
            ...other } = this.props;
    const errorText = this.validateText(value);
    const textFieldValue = isNull(value) || isUndefined(value) ? '' : value;
      return (
      <TextField
        value={textFieldValue}
        onChange={this.onTextChange}
        onBlur={this.onBlur}
        fullWidth
        ref="textField"
        floatingLabelText={displayName}
        errorText={errorText}
        {...other}
      />
    );
  }
}

TextDataField.propTypes = {
  displayName: React.PropTypes.string,
  value: React.PropTypes.any,
  docField: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  isRequired: React.PropTypes.bool,
  validatorType: React.PropTypes.string,
  onInvalid: React.PropTypes.func,
  validationRegex: React.PropTypes.string,
  onBlurred: React.PropTypes.func,
};
