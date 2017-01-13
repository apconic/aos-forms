import React from 'react';
import TextField from 'material-ui/TextField';
import { floor } from 'lodash';
import Field from './field';

export default class NumberDataField extends Field {
  constructor(props) {
    super(props);
    this.state = {
      errorText: this.validateText(props.isRequired, props.value),
    };
    this.onTextChange = this.onTextChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { isRequired } = newProps;
    this.setState({
      errorText: this.validateText(isRequired, newProps.value),
    });
  }

  onTextChange(event) {
    const { onChange, isRequired, decimalPlaces } = this.props;
    event.preventDefault();
    const textFieldValue = this.refs.numberField.getValue();
    const errorText = this.validateText(isRequired, textFieldValue);
    this.setState({
      errorText,
    });
    onChange(this.props.docField, floor(textFieldValue, decimalPlaces));
  }

  validateText(isRequired, text) {
    try {
      this.checkMandatory(text);
      this.checkValidation(text, 'isDecimal');
      this.checkRange(text);
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
            onInvalid, // eslint-disable-line no-unused-vars
            ...other } = this.props;
    return (
      <TextField
        value={value}
        onChange={this.onTextChange}
        fullWidth
        ref="numberField"
        floatingLabelText={displayName}
        errorText={this.state.errorText}
        {...other}
      />
    );
  }
}

NumberDataField.propTypes = {
  displayName: React.PropTypes.string,
  value: React.PropTypes.any,
  docField: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  isRequired: React.PropTypes.bool,
  minValue: React.PropTypes.number,
  maxValue: React.PropTypes.number,
  decimalPlaces: React.PropTypes.number,
  onInvalid: React.PropTypes.func,
};
