// @flow

import DataType from '../data-types';
import FieldType from '../field-type';

export default class TimeFieldSchema {
  name: String;
  fieldType: DataType;
  type: FieldType;
  isRequired: boolean;
  defaultValue: Date;
  labelText: String;
  disabled: boolean;

  constructor(name: String) {
    this.name = name;
    this.fieldType = DataType.Time;
    this.type = FieldType.Time;
    this.isRequired = false;
    this.disabled = false;
    this.defaultValue = null;
  }

  label(labelText: String) : TimeFieldSchema {
    this.labelText = labelText;
    return this;
  }

  default(defaultValue: Date) : TimeFieldSchema {
    this.defaultValue = defaultValue;
    return this;
  }

  mandatory() : TimeFieldSchema {
    this.isRequired = true;
    return this;
  }

  readOnly() : TimeFieldSchema {
    this.disabled = true;
    return this;
  }
}
