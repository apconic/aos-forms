import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import PropTypes from 'prop-types';

export default class CheckboxDataField extends Component {
  static propTypes = {
    labelText: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.bool,
    name: PropTypes.string,
    checkedIcon: PropTypes.element,
    disabled: PropTypes.bool,
    iconStyle: PropTypes.object,
    inputStyle: PropTypes.object,
    labelPosition: PropTypes.string,
    labelStyle: PropTypes.object,
    style: PropTypes.object,
    uncheckedIcon: PropTypes.element,
    valueLink: PropTypes.object,
  };

  onCheck = (event, checked) => {
    const { onChange, name } = this.props;
    onChange(name, checked);
  }

  render() {
    const {
      labelText,
      value,
      name,
      checkedIcon,
      disabled,
      iconStyle,
      inputStyle,
      labelPosition,
      labelStyle,
      style,
      uncheckedIcon,
      valueLink,
    } = this.props;
    return (
      <Checkbox
        label={labelText}
        checked={value}
        name={name}
        checkedIcon={checkedIcon}
        disabled={disabled}
        iconStyle={iconStyle}
        inputStyle={inputStyle}
        labelPosition={labelPosition}
        labelStyle={labelStyle}
        onCheck={this.onCheck}
        style={style}
        uncheckedIcon={uncheckedIcon}
        valueLink={valueLink}
      />
    );
  }
}
