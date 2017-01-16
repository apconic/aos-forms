import React from 'react';
import Checkbox from 'material-ui/Checkbox';

const { PropTypes, Component } = React;
export default class CheckboxDataField extends Component {
  static propTypes = {
    labelText: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.bool,
    name: PropTypes.string,
    checkedIcon: PropTypes.element,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    iconStyle: PropTypes.object,
    inputStyle: PropTypes.object,
    labelPosition: PropTypes.string,
    labelStyle: PropTypes.labelStyle,
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
      defaultChecked,
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
        defaultChecked={defaultChecked}
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
