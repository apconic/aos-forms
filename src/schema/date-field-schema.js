// @flow

import DataType from '../data-types';
import FieldType from '../field-type';

export default class DateFieldSchema {
  name: string;
  fieldType: DataType;
  type: FieldType;
  isRequired: boolean;
  defaultValue: Date;
  labelText: string;
  disabled: boolean;

  constructor(name: string) {
    this.name = name;
    this.fieldType = DataType.Date;
    this.type = FieldType.Date;
    this.isRequired = false;
    this.disabled = false;
  }

  label(labelText: string) : DateFieldSchema {
    this.labelText = labelText;
    return this;
  }

  default(defaultValue: Date) : DateFieldSchema {
    this.defaultValue = defaultValue;
    return this;
  }

  mandatory() : DateFieldSchema {
    this.isRequired = true;
    return this;
  }

  readOnly() : DateFieldSchema {
    this.disabled = true;
    return this;
  }
}
