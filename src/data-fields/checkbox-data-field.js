import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import Field from './field';

export default class CheckboxDataField extends Field {
  constructor(props) {
    super(props);
    this.onCheck = this.onCheck.bind(this);
  }

  onCheck(event, checked) {
    this.props.onChange(this.props.docField, checked);
  }

  render() {
    const {
      value,
      displayName,
      docField,
      onChange, isRequired, // eslint-disable-line no-unused-vars
      style,
      ...other,
    } = this.props;
    return (
      <Checkbox
        label={displayName}
        name={docField}
        checked={value}
        onCheck={this.onCheck}
        style={style}
        {...other}
      />
    );
  }
}

CheckboxDataField.propTypes = {
  value: React.PropTypes.bool,
  displayName: React.PropTypes.string,
  docField: React.PropTypes.string,
  onChange: React.PropTypes.func,
};
