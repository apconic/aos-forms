import React from 'react';
import Toggle from 'material-ui/Toggle';

const { PropTypes, Component } = React;
export default class ToggleDataField extends Component {
  static propTypes = {
    value: PropTypes.bool,
    labelText: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,

    disabled: PropTypes.bool,
    labelPosition: PropTypes.string,
  };

  onToggle = (event, toggled) => {
    this.props.onChange(this.props.name, toggled);
  };

  render() {
    const {
      value,
      labelText,
      name,
      disabled,
      labelPosition,
    } = this.props;

    const newProps = {
      toggled: value,
      label: labelText,
      name,
      onToggle: this.onToggle,
      disabled,
      labelPosition: labelPosition || 'right',
    };

    return (
      <Toggle {...newProps} />
    );
  }
}
