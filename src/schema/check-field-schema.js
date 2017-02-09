// @flow

import DataType from '../data-types';
import FieldType from '../field-type';

export default class CheckFieldSchema {
  name: string;
  fieldType: DataType;
  type: FieldType;
  defaultValue: boolean;
  labelText: string;
  disabled: boolean;
  labelPosition: string;

  constructor(name: string) {
    this.name = name;
    this.fieldType = DataType.Boolean;
    this.type = FieldType.Bool;
    this.defaultValue = false;
  }

  label(labelText: string) : CheckFieldSchema {
    this.labelText = labelText;
    return this;
  }

  disabled() : CheckFieldSchema {
    this.disabled = true;
    return this;
  }

  position(labelPosition: string) : CheckFieldSchema {
    this.labelPosition = labelPosition;
    return this;
  }

  default(defaultValue: boolean) : CheckFieldSchema {
    this.defaultValue = defaultValue;
    return this;
  }
}
