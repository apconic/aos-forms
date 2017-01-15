import React from 'react';
import TextField from 'material-ui/TextField';
import { floor, isEmpty } from 'lodash';
import Field from './field';
import { isNullOrUndefined } from 'util';

const { PropTypes } = React;
export default class NumberDataField extends Field {
  static propTypes = {
    decimalPlaces: PropTypes.number,
    defaultValue: PropTypes.any,
    disabled: PropTypes.bool,
    errorStyle: PropTypes.object,
    floatingLabelFixed: PropTypes.bool,
    floatingLabelStyle: PropTypes.object,
    fullWidth: PropTypes.bool,
    hintStyle: PropTypes.object,
    hintText: PropTypes.node,
    isRequired: PropTypes.bool,
    labelText: PropTypes.string,
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onInvalid: PropTypes.func,
    type: PropTypes.string,
    value: PropTypes.any,
  };

  constructor(props) {
    super(props);
  }

  onTextChange = (event) => {
    event.preventDefault();
    const { name, onChange } = this.props;
    const textFieldValue = this.refs.numberField.getValue();
    onChange(name, textFieldValue);
  }

  render() {
    const {
      decimalPlaces,
      defaultValue,
      disabled,
      errorStyle,
      floatingLabelFixed,
      floatingLabelStyle,
      fullWidth,
      hintStyle,
      hintText,
      isRequired,
      labelText,
      minValue,
      maxValue,
      name,
      onChange,
      onInvalid,
      value,
    } = this.props;

    const newProps = {
      defaultValue,
      disabled: disabled || false,
      errorStyle,
      floatingLabelText: labelText,
      floatingLabelFixed,
      floatingLabelStyle,
      fullWidth: fullWidth || true,
      hintStyle,
      hintText,
      name,
      onChange: this.onTextChange,
      ref: 'numberField',
      type: 'number'
    };

    if (isRequired && (isNullOrUndefined(value) || isEmpty(value))) {
      newProps.errorText = '*Required';
    } else if(!this.isValid(value, 'isDecimal')) {
      newProps.errorText = '*Not a number';
    } else if(!this.isInRange(value)) {
      newProps.errorText = '*Not within allowed range'
    } else {
      newProps.value = floor(value, decimalPlaces || 0);
    }
    return (
      <TextField {...newProps} />
    );
  }
}
