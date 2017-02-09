/* @flow */

import DataType from '../data-types';
import FieldType from '../field-type';

export default class TextFieldSchema {
  name: string;
  fieldType: DataType;
  type: FieldType;
  isRequired: boolean;
  defaultValue: string;
  labelText: string;
  validationRegex: string;
  disabled: boolean;

  constructor(name: string) {
    this.name = name;
    this.fieldType = DataType.String;
    this.type = FieldType.Text;
    this.isRequired = false;
    this.disabled = false;
    this.defaultValue = '';
  }

  readOnly() : TextFieldSchema {
    this.disabled = true;
    return this;
  }

  password() : TextFieldSchema {
    this.type = FieldType.Password;
    return this;
  }

  default(defaultValue: string): TextFieldSchema {
    this.defaultValue = defaultValue;
    return this;
  }

  mandatory() : TextFieldSchema {
    this.isRequired = true;
    return this;
  }

  label(labelText: string) : TextFieldSchema {
    this.labelText = labelText;
    return this;
  }

  regex(validationRegex: string) : TextFieldSchema {
    this.validationRegex = validationRegex;
    return this;
  }
}
