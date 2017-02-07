/* @flow */

import DataType from '../data-types';
import FieldType from '../field-type';

export default class TextFieldSchema {
  name: String;
  fieldType: DataType;
  type: FieldType;
  isRequired: boolean;
  defaultValue: String;
  labelText: String;
  validationRegex: String;
  disabled: boolean;

  constructor(name: String) {
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

  default(defaultValue: String): TextFieldSchema {
    this.defaultValue = defaultValue;
    return this;
  }

  mandatory() : TextFieldSchema {
    this.isRequired = true;
    return this;
  }

  label(labelText: String) : TextFieldSchema {
    this.labelText = labelText;
    return this;
  }

  regex(validationRegex: String) : TextFieldSchema {
    this.validationRegex = validationRegex;
    return this;
  }
}
