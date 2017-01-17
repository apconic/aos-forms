import { isNull, isUndefined, isEmpty, toUpper } from 'lodash';
import validator from 'validator';
import { isNullOrUndefined, isDefined } from '../data-fields/util';

const createError = (error) => {
  return { result: false, error };
};

const isLessThanMinValue = (value, minValue) => {
  if (isNullOrUndefined(value || isEmpty(value))) {
    return true;
  } else {
    if (value < minValue) {
      return true;
    }
  }
  return false;
}

const isGreaterThanMaxValue = (value, maxValue) => {
  if (isNullOrUndefined(value) || isEmpty(value)) {
    return true;
  } else {
    if (value > maxValue) {
      return true;
    }
  }

  return false;
}

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
}

export function validateObject(data, schema) {
  const outputData = {};
  for(const prop in schema) {
    if (schema.hasOwnProperty(prop)) {
      outputData[prop] = validateSingleField(prop, data[prop], schema[prop]);
    }
  }
  return outputData;
}

export function validateSingleField(name, value, schema) {
  let fieldValue = value;
  if(isNullOrUndefined(schema)) {
    return null;
  }

  if (isNullOrUndefined(value) && isDefined(schema.defaultValue)) {
    fieldValue = schema.defaultValue;
  }

  const validationResult = validateDataAgainstSchema(name, fieldValue, schema);
  return { value: fieldValue, validationResult};
}

export function validateDataAgainstSchema(name, value, schema) {
  if (isNullOrUndefined(schema)) {
    return { result: true };
  }

  switch(toUpper(schema.fieldType)) {
    case 'STRING':
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
    case 'NUMBER':
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
    case 'DATE':
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
