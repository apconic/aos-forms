import React from 'react';
import TextField from 'material-ui/TextField';
import { floor, isEmpty } from 'lodash';
import { isNullOrUndefined, isDefined } from './util';

const { PropTypes, Component } = React;
export default class NumberDataField extends Component {
  static propTypes = {
    decimalPlaces: PropTypes.number,
    defaultValue: PropTypes.any,
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
    type: PropTypes.string,
    value: PropTypes.any,
  };

  constructor(props) {
    super(props);
  }

  onTextChange = (event, newValue) => {
    event.preventDefault();
    const { name, onChange } = this.props;
    const textFieldValue = newValue;
    onChange(name, textFieldValue);
  }

  render() {
    const {
      decimalPlaces,
      defaultValue,
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
      defaultValue,
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
      type: 'number'
    };

    if (isNullOrUndefined(value)) {
      if (isDefined(defaultValue)){
        newProps.value = floor(defaultValue, decimalPlaces || 0);
      }
    } else {
      newProps.value = floor(value, decimalPlaces || 0);
    }
    return (
      <TextField {...newProps} />
    );
  }
}
