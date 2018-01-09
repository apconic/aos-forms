import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';

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
    disabled: PropTypes.bool,
  };

  state = {
    list: [],
  };

  onNewRequest = (chosenRequest) => {
    this.props.onChange(this.props.name, chosenRequest);
  };

  onTextChange = (textFieldValue) => {
    const { name, onChange } = this.props;
    this.setState({
      selectedItem: textFieldValue,
    });
    if (onChange) {
      onChange(name, textFieldValue);
    }
    this.searchInDataSource(textFieldValue);
  }

  searchInDataSource = (inputValue) => {
    const { dataSource, dataSourceConfig } = this.props;
    function criteria(element) {
      const expr = new RegExp(`.*${inputValue}.*`, 'i');
      return (element[dataSourceConfig.text].search(expr) >= 0);
    }
    const updatedList = dataSource.filter(criteria);
    const updatedLimitedList = updatedList.slice(0, 5);
    this.setState({ list: updatedLimitedList });
  }

  handleUpdateInput = (inputValue) => {
    this.onTextChange(inputValue);
  }

  handleBlur = () => {
    const { name, dataSourceConfig } = this.props;
    const { list } = this.state;
    if (list.length === 0) {
      this.onTextChange(null);
      return;
    }
    let selectedValue = this.state.selectedItem;
    
    if (selectedValue && list[0]) {
      selectedValue = (dataSourceConfig) ? list[0] : list[0][name];
    }
    this.onTextChange(selectedValue);
  }

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
      disabled,
    } = this.props;
    let searchText = value;
    const { list } = this.state;
    if (dataSourceConfig) {
      searchText = value ? value[dataSourceConfig.text] : '';
    } else if (value != null && typeof (value) === 'object' && displayField) {
      searchText = value[displayField];
    }
    return (
      <AutoComplete
        disabled={disabled || false}
        searchText={searchText}
        dataSource={list || dataSource}
        dataSourceConfig={dataSourceConfig}
        errorText={errorText}
        floatingLabelText={labelText}
        fullWidth={fullWidth}
        name={name}
        filter={filter}
        onNewRequest={this.onNewRequest}
        onUpdateInput={this.handleUpdateInput}
        onBlur={this.handleBlur}
      />
    );
  }
}
