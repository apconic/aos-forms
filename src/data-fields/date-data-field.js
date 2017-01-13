import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import Field from './field';

class DateDataField extends Field {
  constructor(props) {
    super(props);
    this.onDateChanged = this.onDateChanged.bind(this);
  }

  onDateChanged(event, newDate) {
    this.props.onChange(this.props.docField, newDate);
  }

  render() {
    const { value, displayName, isRequired, onChange, docField, type, ...other } = this.props; // eslint-disable-line
    return (
      <DatePicker
        floatingLabelText={displayName}
        autoOk
        value={value}
        onChange={this.onDateChanged}
        {...other}
      />
    );
  }
}

DateDataField.propTypes = {
  value: React.PropTypes.object,
  displayName: React.PropTypes.string,
  docField: React.PropTypes.string,
  onChange: React.PropTypes.func,
};

export default DateDataField;
