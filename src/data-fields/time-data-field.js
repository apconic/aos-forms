import React from 'react';
import TimePicker from 'material-ui/TimePicker';
import Field from './field';

export default class TimeDataField extends Field {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, time) {
    this.props.onChange(this.props.docField, time);
  }

  render() {
    const { value, displayName, onChange, docField, type, isRequired, ...other } = this.props; // eslint-disable-line
    return (
      <TimePicker
        value={value}
        floatingLabelText={displayName}
        autoOk onChange={this.handleChange}
        { ...other }
      />
    );
  }
}

TimeDataField.propTypes = {
  value: React.PropTypes.object,
  displayName: React.PropTypes.string,
  docField: React.PropTypes.string,
  onChange: React.PropTypes.func,
};
