import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import { isNullOrUndefined, isDefined } from './util';

const { PropTypes, Component } = React;
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
    onChange: PropTypes.func,
    onDismiss: PropTypes.func,
    onFocus: PropTypes.func,
    onShow: PropTypes.func,
    onTouchTap: PropTypes.func,
    shouldDisableDate: PropTypes.func,
    style: PropTypes.object,

    textFieldStyle: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  onDateChanged = (event, newDate) => {
    const { onChange, name } = this.props;
    onChange(name, newDate);
  }

  render() {
    const {
      value,
      isRequired,
      labelText,

      DateTimeFormat,
      autoOk,
      cancelLabel,
      className,
      container,
      defaultDate,
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
      dialogContainerStyle: dialogContainerStyle,
      disableYearSelection: disableYearSelection,
      errorText,
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

    if (isDefined(defaultDate)) {
      newProps.defaultDate = defaultDate;
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

