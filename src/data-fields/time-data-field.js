import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimePicker from 'material-ui/TimePicker';

export default class TimeDataField extends Component {
  static propTypes = {
    value: PropTypes.object,
    labelText: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    autoOk: PropTypes.bool,
    disabled: PropTypes.bool,
    format: PropTypes.string,
    onDismiss: PropTypes.func,
    onFocus: PropTypes.func,
    onShow: PropTypes.func,
    onTouchTap: PropTypes.func,
    pedantic: PropTypes.bool,
    style: PropTypes.object,
    textFieldStyle: PropTypes.object,
    errorText: PropTypes.node,
  };

  handleChange = (event, time) => {
    this.props.onChange(this.props.name, time);
  };

  render() {
    const newProps = {
      floatingLabelText: this.props.labelText,
      autoOk: this.props.autoOk || false,
      disabled: this.props.disabled || false,
      format: this.props.format || 'ampm',
      onChange: this.handleChange,
      onDismiss: this.props.onDismiss,
      onFocus: this.props.onFocus,
      onShow: this.props.onShow,
      onTouchTap: this.props.onTouchTap,
      pedantic: this.props.pedantic || false,
      style: this.props.style || {},
      textFieldStyle: this.props.textFieldStyle || {},
      value: this.props.value || null,
      errorText: this.props.errorText || '',
    };
    return (
      <TimePicker
        {...newProps}
      />
    );
  }
}
