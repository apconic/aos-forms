import React from 'react';
import TimePicker from 'material-ui/TimePicker';
import Field from './field';

export default class TimeDataField extends Field {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, time) {
    this.props.onChange(this.props.name, time);
  }

  render() {
    const { value, labelText, onChange, name, type, isRequired, ...other } = this.props; // eslint-disable-line
    return (
      <TimePicker
        value={value}
        floatingLabelText={labelText}
        autoOk onChange={this.handleChange}
        { ...other }
      />
    );
  }
}

TimeDataField.propTypes = {
  value: React.PropTypes.object,
  labelText: React.PropTypes.string,
  name: React.PropTypes.string,
  onChange: React.PropTypes.func,
};
