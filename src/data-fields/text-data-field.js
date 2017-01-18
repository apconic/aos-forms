import React from 'react';
import TextField from 'material-ui/TextField';
import { trim } from 'lodash';
import { isNullOrUndefined } from './util';

const { PropTypes, Component } = React;
export default class TextDataField extends Component {
  static propTypes = {
    className: PropTypes.string,
    defaultValue: PropTypes.any,
    disabled: PropTypes.bool,
    errorText: PropTypes.string,
    errorStyle: PropTypes.object,
    floatingLabelFixed: PropTypes.bool,
    floatingLabelStyle: PropTypes.object,
    fullWidth: PropTypes.bool,
    hintStyle: PropTypes.object,
    hintText: PropTypes.node,
    id: PropTypes.string,
    inputStyle: PropTypes.string,
    labelText: PropTypes.string,
    multiLine: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onBlurred: PropTypes.func,
    rows: PropTypes.number,
    rowsMax: PropTypes.number,
    type: PropTypes.string,
    value: PropTypes.any,
  };

  onBlur = (event) => {
    const { onChange, name, onBlurred } = this.props;
    const textFieldValue = trim(event.target.value);
    if (onBlurred) {
      onBlurred(name, textFieldValue);
      return;
    }
    onChange(name, textFieldValue);
  };

  onTextChange = (event, newValue) => {
    event.preventDefault();
    const { onChange, name } = this.props;
    const textFieldValue = newValue;
    onChange(name, textFieldValue);
  };

  render() {
    const {
      className,
      defaultValue,
      disabled,
      errorText,
      errorStyle,
      floatingLabelFixed,
      floatingLabelStyle,
      fullWidth,
      hintStyle,
      hintText,
      id,
      inputStyle,
      labelText,
      multiLine,
      name,
      rows,
      rowsMax,
      type,
      value,
    } = this.props;

    const newProps = {
      className,
      defaultValue,
      disabled,
      errorText,
      errorStyle,
      floatingLabelText: labelText,
      floatingLabelFixed,
      floatingLabelStyle,
      fullWidth: fullWidth || true,
      hintStyle,
      hintText,
      id,
      inputStyle,
      multiLine,
      name,
      onChange: this.onTextChange,
      onBlur: this.onBlur,
      rows,
      rowsMax,
      type,
    };

    if (isNullOrUndefined(value)) {
      if (isNullOrUndefined(defaultValue)) {
        newProps.value = '';
      }
      newProps.value = defaultValue;
    } else {
      newProps.value = value;
    }
    console.log(newProps);
    return (
      <TextField {...newProps} />
    );
  }
}
