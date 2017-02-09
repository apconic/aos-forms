/* @flow */

import DataType from '../data-types';
import FieldType from '../field-type';

export default class SelectFieldSchema {
  name: string;
  fieldType: DataType;
  type: FieldType;
  isRequired: boolean;
  defaultValue: string;
  labelText: string;
  disabled: boolean;
  dataSource: any;
  dataSourceConfig: any;

  constructor(name: string) {
    this.name = name;
    this.fieldType = DataType.String;
    this.type = FieldType.Select;
    this.isRequired = false;
    this.disabled = false;
  }

  strings(dataSource: Array<string>) : SelectFieldSchema {
    this.dataSource = dataSource;
    return this;
  }

  numbers(dataSource: Array<number>) : SelectFieldSchema {
    this.dataSource = dataSource;
    this.fieldType = DataType.Number;
    return this;
  }

  objects(dataSource: Array<Object>, dataSourceConfig: Object) : SelectFieldSchema {
    this.dataSource = dataSource;
    this.dataSourceConfig = dataSourceConfig;
    this.fieldType = DataType.Any;
    return this;
  }

  readOnly() : SelectFieldSchema {
    this.disabled = true;
    return this;
  }

  default(defaultValue: string): SelectFieldSchema {
    this.defaultValue = defaultValue;
    return this;
  }

  mandatory() : SelectFieldSchema {
    this.isRequired = true;
    return this;
  }

  label(labelText: string) : SelectFieldSchema {
    this.labelText = labelText;
    return this;
  }
}
