import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const { PropTypes, Component } = React; 
export default class SelectDataField extends Component {
  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    errorText: PropTypes.node,
    dataSource: PropTypes.array,
    dataSourceConfig: PropTypes.object,
    name: PropTypes.string,
    labelText: PropTypes.string,
    disabled: PropTypes.bool,
    style: PropTypes.object,
  };

  handleChange = (event, selectedIndex, value) => {
    event.preventDefault();
    this.props.onChange(this.props.name, value);
  };

  render() {
    const {
      value,
      name,
      dataSource,
      dataSourceConfig,
      labelText,
      errorText,
      disabled,
      style,
    } = this.props;
    let menu = null;
    if (dataSourceConfig) {
      let index = 0;
      menu = dataSource.map((item) => {
        const menuItemProps = {};
        menuItemProps.value = dataSourceConfig.valueKey ? item[dataSourceConfig.valueKey] : item;
        menuItemProps.primaryText = item[dataSourceConfig.primaryTextKey];
        index += 1;
        menuItemProps.key = index;
        if (dataSourceConfig.secondaryTextKey) {
          menuItemProps.secondaryText = item[dataSourceConfig.secondaryTextKey];
        }
        return (
          <MenuItem
            {...menuItemProps}
          />
        );
      });
    } else {
      let index = 0;
      menu = dataSource.map((item) => {
        const menuItemProps = {};
        index += 1;
        menuItemProps.value = item;
        menuItemProps.primaryText = item;
        menuItemProps.key = index;
        return (
          <MenuItem {...menuItemProps} />
        );
      });
    }
    const newProps = {
      value,
      name,
      floatingLabelText: labelText,
      errorText,
      disabled,
      fullWidth: true,
      onChange: this.handleChange,
      style,
    };

    return (
      <SelectField {...newProps}>
        {menu}
      </SelectField>
    );
  }
}
