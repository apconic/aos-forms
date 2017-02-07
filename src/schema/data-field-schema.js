// @flow

import NumberSchema from './number-field-schema';
import TextFieldSchema from './text-field-schema';
import DateFieldSchema from './date-field-schema';
import TimeFieldSchema from './time-field-schema';
import ToggleSchema from './toggle-schema';
import CheckFieldSchema from './check-field-schema';

export default class DataFieldSchema {
  static number(name: String) : NumberSchema {
    return new NumberSchema(name);
  }

  static text(name: String) : TextFieldSchema {
    return new TextFieldSchema(name);
  }

  static date(name: String) : DateFieldSchema {
    return new DateFieldSchema(name);
  }

  static time(name: String) : TimeFieldSchema {
    return new TimeFieldSchema(name);
  }

  static toggle(name: String) : ToggleSchema {
    return new ToggleSchema(name);
  }

  static check(name: String) : CheckFieldSchema {
    return new CheckFieldSchema(name);
  }
}
