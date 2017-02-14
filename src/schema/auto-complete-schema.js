/* @flow */
import FieldType from '../field-type';
import DataType from '../data-types';

export default class AutoCompleteSchema {
  name: string;
  labelText: string;
  dataSource: any;
  dataSourceConfig: any;
  fieldType: FieldType;
  type: DataType;
  fullWidth: boolean;

  constructor(name: string) {
    this.name = name;
    this.fieldType = DataType.String;
    this.type = FieldType.AutoComplete;
    this.fullWidth = true;
  }

  label(labelText: string) : AutoCompleteSchema {
    this.labelText = labelText;
    return this;
  }

  strings(dataSource: Array<string>) : AutoCompleteSchema {
    this.dataSource = dataSource;
    return this;
  }

  objects(dataSource: Array<Object>, dataSourceConfig: Object) : AutoCompleteSchema {
    this.dataSource = dataSource;
    this.dataSourceConfig = dataSourceConfig;
    return this;
  }
}
