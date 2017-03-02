import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';

const { PropTypes, Component } = React;
export default class AutoCompleteDataField extends Component {
  static propTypes = {
    dataSource: PropTypes.array,
    dataSourceConfig: PropTypes.object,
    displayField: PropTypes.string,
    errorText: PropTypes.node,
    labelText: PropTypes.string,
    fullWidth: PropTypes.bool,
    name: PropTypes.string,
    filter: PropTypes.func,
    value: PropTypes.any,
    onChange: PropTypes.func,
  };

  onNewRequest = (chosenRequest) => {
    this.props.onChange(this.props.name, chosenRequest);
  };

  render() {
    const {
      dataSource,
      dataSourceConfig,
      errorText,
      labelText,
      fullWidth,
      name,
      filter,
      value,
      displayField,
    } = this.props;

    let searchText = value;
    if (dataSourceConfig) {
      searchText = value ? value[dataSourceConfig.text] : '';
    } else if (value != null && typeof (value) === 'object' && displayField) {
      searchText = value[displayField];
    }
    return (
      <AutoComplete
        searchText={searchText}
        dataSource={dataSource}
        dataSourceConfig={dataSourceConfig}
        errorText={errorText}
        floatingLabelText={labelText}
        fullWidth={fullWidth}
        name={name}
        filter={filter}
        onNewRequest={this.onNewRequest}
      />
    );
  }
}
