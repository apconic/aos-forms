// @flow

import DataType from '../data-types';
import FieldType from '../field-type';

export default class CheckFieldSchema {
  name: String;
  fieldType: DataType;
  type: FieldType;
  defaultValue: boolean;
  labelText: String;
  disabled: boolean;
  labelPosition: String;

  constructor(name: String) {
    this.name = name;
    this.fieldType = DataType.Boolean;
    this.type = FieldType.Bool;
    this.defaultValue = false;
  }

  label(labelText: String) : CheckFieldSchema {
    this.labelText = labelText;
    return this;
  }

  disabled() : CheckFieldSchema {
    this.disabled = true;
    return this;
  }

  position(labelPosition: String) : CheckFieldSchema {
    this.labelPosition = labelPosition;
    return this;
  }

  default(defaultValue: boolean) : CheckFieldSchema {
    this.defaultValue = defaultValue;
    return this;
  }
}
