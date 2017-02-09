// @flow

import NumberSchema from './number-field-schema';
import TextFieldSchema from './text-field-schema';
import DateFieldSchema from './date-field-schema';
import TimeFieldSchema from './time-field-schema';
import ToggleSchema from './toggle-schema';
import CheckFieldSchema from './check-field-schema';
import SelectFieldSchema from './select-field-schema';
import AutoCompleteSchema from './auto-complete-schema';

export default class DataFieldSchema {
  static number(name: string) : NumberSchema {
    return new NumberSchema(name);
  }

  static text(name: string) : TextFieldSchema {
    return new TextFieldSchema(name);
  }

  static date(name: string) : DateFieldSchema {
    return new DateFieldSchema(name);
  }

  static time(name: string) : TimeFieldSchema {
    return new TimeFieldSchema(name);
  }

  static toggle(name: string) : ToggleSchema {
    return new ToggleSchema(name);
  }

  static check(name: string) : CheckFieldSchema {
    return new CheckFieldSchema(name);
  }

  static select(name: string) : SelectFieldSchema {
    return new SelectFieldSchema(name);
  }

  static autoComplete(name: string) : AutoCompleteSchema {
    return new AutoCompleteSchema(name);
  }
}
