import React from 'react';
import { find, isUndefined } from 'lodash';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Field from './field';

export default class SelectDataField extends Field {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    const value = this.isValueAvailable(props.menuItems, props.value);
    this.menus = [];
    let index = 0;
    props.menuItems.forEach((menu) => {
      this.menus.push(<MenuItem key={index++} {...menu} />);
    });
    this.state = { errorText: this.checkFieldSelected(value),
    };
  }

  componentWillReceiveProps(newProps) {
    if (JSON.stringify(newProps.menuItems) !== JSON.stringify(this.props.menuItems)) {
      this.menus.length = 0;
      let index = 0;
      newProps.menuItems.forEach((menu) => {
        this.menus.push(<MenuItem key={index++} {...menu} />);
      });
    }
    const value = this.isValueAvailable(this.props.menuItems, newProps.value);
    this.setState({ errorText: this.checkFieldSelected(value, newProps) });
  }

  checkFieldSelected(value, newProps) {
    try {
      this.checkMandatory(value, newProps);
    } catch (error) {
      this.fieldIsInvalid();
      return error.message;
    }
    this.fieldIsValid();
    return null;
  }

  isValueAvailable(menuItems, value) {
    const returnedMenuItem = find(menuItems, (menuItem) => (menuItem.value === value));
    return isUndefined(returnedMenuItem) ? null : returnedMenuItem.value;
  }

  handleChange(event, selectedIndex, value) {
    event.preventDefault();
    this.props.onChange(this.props.name, value);
  }

  render() {
    const { value,
            onChange, // eslint-disable-line no-unused-vars
            name, // eslint-disable-line no-unused-vars
            isRequired, // eslint-disable-line no-unused-vars
            menuItems, // eslint-disable-line no-unused-vars
            labelText,
            ...other } = this.props;
    return (
      <SelectField
        value={value}
        floatingLabelText={labelText}
        onChange={this.handleChange}
        errorText={this.state.errorText}
        fullWidth
        {...other}
      >
        {this.menus}
      </SelectField>
    );
  }
}

SelectDataField.propTypes = {
  value: React.PropTypes.any,
  onChange: React.PropTypes.func,
  menuItems: React.PropTypes.array,
  name: React.PropTypes.string,
  labelText: React.PropTypes.string,
  isRequired: React.PropTypes.bool,
};
