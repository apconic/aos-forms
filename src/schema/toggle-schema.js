// @flow

import DataType from '../data-types';
import FieldType from '../field-type';

export default class ToggleSchema {
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
    this.type = FieldType.Toggle;
    this.defaultValue = false;
  }

  label(labelText: String) : ToggleSchema {
    this.labelText = labelText;
    return this;
  }

  disabled() : ToggleSchema {
    this.disabled = true;
    return this;
  }

  position(labelPosition: String) : ToggleSchema {
    this.labelPosition = labelPosition;
    return this;
  }

  default(defaultValue: boolean) : ToggleSchema {
    this.defaultValue = defaultValue;
    return this;
  }
}
