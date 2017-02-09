import React from 'react';
import { toUpper } from 'lodash';
import TimeDataField from './time-data-field';
import TextDataField from './text-data-field';
import DateDataField from './date-data-field';
import CheckboxDataField from './checkbox-data-field';
import SelectDataField from './select-data-field';
import FilteredSelectDataField from './filtered-select-data-fields';
import PasswordDataField from './password-data-field';
import FormulaDataField from './formula-data-field';
import NumberDataField from './number-data-field';
import ReadOnlyDataField from './read-only-text-field';
import ToggleDataField from './toggle-data-field';
import AutoCompleteField from './autocomplete-data-field';
import FieldType from '../field-type';

export default class DataField extends React.Component {
  getType() {
    if (this.props.type) {
      return this.props.type;
    }
    return FieldType.ReadOnly;
  }

  createAutoCompleteComponent() {
    return <AutoCompleteField {...this.props} />;
  }

  createToggleComponent() {
    return <ToggleDataField {...this.props} />;
  }

  createReadOnlyDataField() {
    return <ReadOnlyDataField {...this.props} />;
  }

  createDateComponent() {
    const value = new Date(this.props.value);
    return <DateDataField value={value} {...this.props} />;
  }

  createTextComponent() {
    return <TextDataField {...this.props} />;
  }

  createNumberDataField() {
    return <NumberDataField {...this.props} />;
  }

  createTimeComponent() {
    const value = new Date(this.props.value);
    return <TimeDataField value={value} {...this.props} />;
  }

  createCheckboxComponent() {
    return (<CheckboxDataField {...this.props} />);
  }

  createSelectComponent() {
    return (<SelectDataField {...this.props} />);
  }

  createFilterSelectComponent() {
    return (<FilteredSelectDataField {...this.props} />);
  }

  createPasswordComponent() {
    return (<PasswordDataField {...this.props} />);
  }

  createFormulaComponent() {
    return <FormulaDataField {...this.props} />;
  }

  createField() {
    const type = this.getType();
    switch (toUpper(type)) {
      case FieldType.AutoComplete:
        return this.createAutoCompleteComponent();
      case FieldType.Date:
        return this.createDateComponent();
      case FieldType.Time:
        return this.createTimeComponent();
      case FieldType.Bool:
        return this.createCheckboxComponent();
      case FieldType.Select:
        return this.createSelectComponent();
      case FieldType.FilterSelect:
        return this.createFilterSelectComponent();
      case FieldType.Password:
        return this.createPasswordComponent();
      case FieldType.Formula:
        return this.createFormulaComponent();
      case FieldType.Number :
        return this.createNumberDataField();
      case FieldType.Text:
        return this.createTextComponent();
      case FieldType.Toggle:
        return this.createToggleComponent();
      default:
        return this.createReadOnlyDataField();
    }
  }

  render() {
    return (
      <div>
        {this.createField()}
      </div>
    );
  }
}

DataField.propTypes = {
  value: React.PropTypes.oneOfType(
    [
      React.PropTypes.string,
      React.PropTypes.bool,
      React.PropTypes.number,
      React.PropTypes.object,
      React.PropTypes.array,
    ]
  ),
  type: React.PropTypes.string,
};
