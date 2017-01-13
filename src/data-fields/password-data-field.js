import React from 'react';
import TextField from 'material-ui/TextField';
import { DisplayMessages } from '../messages';
import Field from './field';
import { isNull, isUndefined, isEmpty } from 'lodash';

export default class PasswordDataField extends Field {
  constructor(props) {
    super(props);
    this.state = { errorText: this.validateText(props.value) };
    this.onTextChange = this.onTextChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { value } = newProps;
    this.setState({ errorText: this.validateText(value) });
  }

  onTextChange(event) {
    const { onChange } = this.props;
    event.preventDefault();
    const textFieldValue = this.refs.passwordField.getValue();
    this.setState({ errorText: this.validateText(textFieldValue) });
    onChange(this.props.docField, textFieldValue);
  }

  validateText(text) {
    const { isRequired } = this.props;
    if (isRequired !== false &&
        (isNull(text) || isUndefined(text) || isEmpty(text.trim()))) {
      return DisplayMessages.requiredText;
    }
    return '';
  }

  render() {
    const { displayName, isRequired,
      value, docField, onChange, ...other } = this.props; // eslint-disable-line no-unused-vars
    return (
      <TextField
        value={value || ''}
        onChange={this.onTextChange}
        ref="passwordField"
        fullWidth
        floatingLabelText={displayName}
        type="password"
        errorText={this.state.errorText}
        {...other}
      />
    );
  }
}

PasswordDataField.propTypes = {
  displayName: React.PropTypes.string,
  value: React.PropTypes.any,
  docField: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  isRequired: React.PropTypes.bool,
};
