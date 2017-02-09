import { isEmpty, toUpper, forOwn, omit, toNumber } from 'lodash';
import validator from 'validator';
import DataType from '../data-types';
import Util, { isNullOrUndefined, isDefined } from '../util';

const createError = error => ({ result: false, error });

const isLessThanMinValue = (value, minValue) => {
  if (isNullOrUndefined(minValue)) {
    return false;
  }

  if (isNullOrUndefined(value || isEmpty(value))) {
    return true;
  } else if (value < minValue) {
    return true;
  }
  return false;
};

const isGreaterThanMaxValue = (value, maxValue) => {
  if (isNullOrUndefined(maxValue)) {
    return false;
  }

  if (isNullOrUndefined(value) || isEmpty(value)) {
    return true;
  } else if (value > maxValue) {
    return true;
  }
  return false;
};

const isValid = (text, validatorToUse) => {
  if (!validatorToUse) {
    return true;
  }

  if (!isEmpty(text) && !validator[validatorToUse](`${text}`)) {
    return false;
  }
  return true;
}

const isValidRegex = (text, validationRegex) => {
  if (isNullOrUndefined(text) || isNullOrUndefined(validationRegex)) {
    return true;
  }
  const pattern = new RegExp(validationRegex);
  const response = text.match(pattern);
  if (!response) {
    return false;
  }
  return true;
};

export function isFormValid(form) {
  const formFields = omit(form, 'schema', 'valid');
  let valid = true;
  forOwn(formFields, (value) => {
    valid = valid && (value && value.validationResult ? value.validationResult.result : false);
  });
  return valid;
}

export function validateDataAgainstSchema(name, value, schema) {
  if (isNullOrUndefined(schema)) {
    return { result: true };
  }

  switch (toUpper(schema.fieldType)) {
    case DataType.Any:
      if (schema.isRequired && (isNullOrUndefined(value) || isEmpty(value))) {
        return {
          result: false,
          error: '*Required',
        };
      }
      return { result: true };
    case DataType.String:
      if (schema.isRequired && (isNullOrUndefined(value) || isEmpty(value))) {
        return {
          result: false,
          error: '*Required',
        };
      }

      if (!isValid(value, schema.validatorType)) {
        return createError('*Invalid value');
      }

      if (!isValidRegex(value, schema.validationRegex)) {
        return createError('*Invalid value');
      }
      return { result: true };
    case DataType.Number:
      if (schema.isRequired && (isNullOrUndefined(value) || isEmpty(value))) {
        return {
          result: false,
          error: '*Required',
        };
      }

      if (!isValid(value, 'isDecimal')) {
        return { result: false, error: '*Invalid value type'};
      }

      if (isLessThanMinValue(value, schema.minValue)) {
        return { result: false, error: '*Invalid value' };
      }

      if (isGreaterThanMaxValue(value, schema.maxValue)) {
        return { result: false, error: '*Invalid value' };
      }
      return { result: true };
    case DataType.Date:
      if (schema.isRequired && isNullOrUndefined(value)) {
        return {
          result: false,
          error: '*Required',
        };
      }
      return { result: true };
    case DataType.Time:
      if (schema.isRequired && isNullOrUndefined(value)) {
        return {
          result: false,
          error: '*Required',
        };
      }
      return { result: true };
    default:
      return { result: true };
  }
}

export function validateSingleField(name, value, schema) {
  let fieldValue = value;
  if (isNullOrUndefined(schema)) {
    return null;
  }

  if (isNullOrUndefined(value) && isDefined(schema.defaultValue)) {
    fieldValue = schema.defaultValue;
  }

  // If the field is array type than initialize it to an empty Array
  // if value is null or undefined.
  if (toUpper(schema.fieldType) === DataType.Array && isNullOrUndefined(fieldValue)) {
    fieldValue = [];
  }

  const validationResult = validateDataAgainstSchema(name, fieldValue, schema);

  // Apply decimal places to the number
  if (validationResult.result && (toUpper(schema.fieldType) === DataType.Number)) {
    fieldValue = Util.fixDouble(toNumber(fieldValue), schema.decimalPlaces);
  }
  return { value: fieldValue, validationResult: { ...validationResult } };
}

export function validateObject(data, schema) {
  const outputData = {};
  forOwn(schema, (value, key) => {
    const retValue = validateSingleField(key, data[key], value);
    if (isDefined(retValue)) {
      outputData[key] = retValue;
    }
  });

  return outputData;
}
