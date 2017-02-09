/* @flow */

import DataType from '../data-types';
import FieldType from '../field-type';

export default class NumberSchema {
  name: string;
  fieldType: DataType;
  type: FieldType;
  isRequired: boolean;
  decimalPlaces: number;
  defaultValue: number;
  minValue: number;
  maxValue: number;
  labelText: string;
  disabled: boolean;

  constructor(name: string) {
    this.name = name;
    this.fieldType = DataType.Number;
    this.type = FieldType.Number;
    this.isRequired = false;
    this.decimalPlaces = 0;
    this.disabled = false;
    this.defaultValue = 0;
  }

  readOnly() : NumberSchema {
    this.disabled = true;
    return this;
  }

  default(defaultValue: number): NumberSchema {
    this.defaultValue = defaultValue;
    return this;
  }

  decimal(decimalPlaces: number) : NumberSchema {
    this.decimalPlaces = decimalPlaces;
    return this;
  }

  min(minValue: number) : NumberSchema {
    this.minValue = minValue;
    return this;
  }

  max(maxValue: number) : NumberSchema {
    this.maxValue = maxValue;
    return this;
  }

  mandatory() : NumberSchema {
    this.isRequired = true;
    return this;
  }

  label(labelText: string) : NumberSchema {
    this.labelText = labelText;
    return this;
  }
}
