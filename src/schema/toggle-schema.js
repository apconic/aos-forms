// @flow

import DataType from '../data-types';
import FieldType from '../field-type';

export default class ToggleSchema {
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
    this.type = FieldType.Toggle;
    this.defaultValue = false;
  }

  label(labelText: string) : ToggleSchema {
    this.labelText = labelText;
    return this;
  }

  disabled() : ToggleSchema {
    this.disabled = true;
    return this;
  }

  position(labelPosition: string) : ToggleSchema {
    this.labelPosition = labelPosition;
    return this;
  }

  default(defaultValue: boolean) : ToggleSchema {
    this.defaultValue = defaultValue;
    return this;
  }
}
