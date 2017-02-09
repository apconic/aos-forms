// @flow

import DataType from '../data-types';
import FieldType from '../field-type';

export default class TimeFieldSchema {
  name: string;
  fieldType: DataType;
  type: FieldType;
  isRequired: boolean;
  defaultValue: Date;
  labelText: string;
  disabled: boolean;

  constructor(name: string) {
    this.name = name;
    this.fieldType = DataType.Time;
    this.type = FieldType.Time;
    this.isRequired = false;
    this.disabled = false;
  }

  label(labelText: string) : TimeFieldSchema {
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
