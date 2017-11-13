import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

export default class NumberDataField extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    errorText: PropTypes.string,
    errorStyle: PropTypes.object,
    floatingLabelFixed: PropTypes.bool,
    floatingLabelStyle: PropTypes.object,
    fullWidth: PropTypes.bool,
    hintStyle: PropTypes.object,
    hintText: PropTypes.node,
    labelText: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any,
  };

  onTextChange = (event, newValue) => {
    event.preventDefault();
    const { name, onChange } = this.props;
    const textFieldValue = newValue;
    onChange(name, textFieldValue);
  }

  render() {
    const {
      disabled,
      errorText,
      errorStyle,
      floatingLabelFixed,
      floatingLabelStyle,
      fullWidth,
      hintStyle,
      hintText,
      labelText,
      name,
      value,
    } = this.props;

    const newProps = {
      disabled: disabled || false,
      errorText,
      errorStyle,
      floatingLabelText: labelText,
      floatingLabelFixed,
      floatingLabelStyle,
      fullWidth: fullWidth || true,
      hintStyle,
      hintText,
      name,
      onChange: this.onTextChange,
      type: 'number',
      value,
    };

    return (
      <TextField {...newProps} />
    );
  }
}
