import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui/DatePicker';
import { isNullOrUndefined, isDefined } from '../util';

export default class DateDataField extends Component {
  static propTypes = {
    labelText: PropTypes.string,
    value: PropTypes.object,
    name: PropTypes.string,
    onChange: PropTypes.func,

    DateTimeFormat: PropTypes.func,
    autoOk: PropTypes.func,
    cancelLabel: PropTypes.node,
    className: PropTypes.string,
    container: PropTypes.string,
    defaultDate: PropTypes.object,
    dialogContainerStyle: PropTypes.object,
    disableYearSelection: PropTypes.bool,
    disabled: PropTypes.bool,
    errorText: PropTypes.string,
    firstDayOfWeek: PropTypes.number,
    formatDate: PropTypes.func,
    locale: PropTypes.string,

    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    mode: PropTypes.string,
    okLabel: PropTypes.node,
    onDismiss: PropTypes.func,
    onFocus: PropTypes.func,
    onShow: PropTypes.func,
    onTouchTap: PropTypes.func,
    shouldDisableDate: PropTypes.func,
    style: PropTypes.object,

    textFieldStyle: PropTypes.object,
  };

  onDateChanged = (event, newDate) => {
    const { onChange, name } = this.props;
    onChange(name, newDate);
  }

  render() {
    const {
      value,
      labelText,

      DateTimeFormat,
      autoOk,
      cancelLabel,
      className,
      container,
      dialogContainerStyle,
      disableYearSelection,
      disabled,
      errorText,
      firstDayOfWeek,
      formatDate,
      locale,

      maxDate,
      minDate,
      mode,
      okLabel,
      onDismiss,
      onFocus,
      onShow,
      onTouchTap,
      shouldDisableDate,
      style,

      textFieldStyle,
    } = this.props;

    const newProps = {
      floatingLabelText: labelText,
      autoOk: autoOk || false,
      className: className || '',
      disabled: disabled || false,
      firstDayOfWeek: firstDayOfWeek || 1,
      mode: mode || 'portrait',
      onChange: this.onDateChanged,
      dialogContainerStyle,
      disableYearSelection,
      errorText,
      maxDate,
      minDate,
      okLabel,
      onDismiss,
      onFocus,
      onShow,
      onTouchTap,
      shouldDisableDate,
      style,
      textFieldStyle,
    };

    if (!isNullOrUndefined(DateTimeFormat)) {
      newProps.DateTimeFormat = DateTimeFormat;
    }

    if (!isNullOrUndefined(cancelLabel)) {
      newProps.cancelLabel = cancelLabel;
    }

    if (!isNullOrUndefined(container)) {
      newProps.container = container;
    }

    if (isDefined(formatDate)) {
      newProps.formatDate = formatDate;
    }

    if (isDefined(locale)) {
      newProps.locale = locale;
    }

    if (isDefined(value)) {
      newProps.value = value;
    }

    return (
      <DatePicker {...newProps} />
    );
  }
}

