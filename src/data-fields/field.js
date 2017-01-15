import React from 'react';
import { DisplayMessages } from '../messages';
import validator from 'validator';
import { trim, toNumber } from 'lodash';

export default class Field extends React.Component {
  checkBlank(text) {
    const trimmedText = text || text === 0 ? trim(text) : undefined;
    return (!(text || text === 0) || (trimmedText.length === 0));
  }

  isInRange(number) {
    const { minValue, maxValue } = this.props;
    if (!this.checkBlank(minValue) && !isNaN(minValue)) {
      if (toNumber(number) < toNumber(minValue)) {
        return false;
      }
    }
    if (!this.checkBlank(maxValue) && !isNaN(maxValue)) {
      if (toNumber(number) > toNumber(maxValue)) {
        return false;
      }
    }
    return true;
  }

  isValid(text, validatorTypeIn) {
    const { validatorType } = this.props;
    const validatorToUse = validatorType || validatorTypeIn;
    if (!validatorToUse) {
      return true;
    }

    if (!this.checkBlank(text) && !validator[validatorToUse](`${text}`)) {
      return false;
    }
    return true;
  }

  fieldIsInvalid() {
    const { onInvalid, labelText, name } = this.props;
    if (onInvalid) {
      onInvalid(true, labelText, name);
    }
  }

  fieldIsValid() {
    const { onInvalid, labelText, name } = this.props;
    if (onInvalid) {
      onInvalid(false, labelText, name);
    }
  }

  checkMandatory(text) {
    const { isRequired } = this.props;
    const isTextBlank = this.checkBlank(text);
    if (isRequired && isTextBlank) {
      throw new Error(DisplayMessages.requiredText);
    }
    return;
  }

  checkValidation(text, validatorTypeIn) {
    const { validatorType } = this.props;
    const validatorToUse = validatorType || validatorTypeIn;
    if (!validatorToUse) {
      return;
    }

    if (!this.checkBlank(text) && !validator[validatorToUse](`${text}`)) {
      throw new Error(DisplayMessages.invalidText);
    }
  }

  checkRegex(text) {
    const { validationRegex } = this.props;
    if (this.checkBlank(text) || !validationRegex) {
      return;
    }
    const pattern = new RegExp(validationRegex);
    const response = text.match(pattern);
    if (!response) {
      throw new Error(`${DisplayMessages.regexFail}  ${validationRegex}`);
    }
  }

  checkRange(number) {
    const { minValue, maxValue } = this.props;
    if (!this.checkBlank(minValue) && !isNaN(minValue)) {
      if (toNumber(number) < toNumber(minValue)) {
        throw new Error(DisplayMessages.lowerRangeFail + toNumber(minValue));
      }
    }
    if (!this.checkBlank(maxValue) && !isNaN(maxValue)) {
      if (toNumber(number) > toNumber(maxValue)) {
        throw new Error(DisplayMessages.upperRangeFail + toNumber(maxValue));
      }
    }
  }

  render() {
    return;
  }
}

Field.propTypes = {
  labelText: React.PropTypes.string,
  value: React.PropTypes.any,
  name: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  isRequired: React.PropTypes.bool,
  minValue: React.PropTypes.number,
  maxValue: React.PropTypes.number,
  decimalPlaces: React.PropTypes.number,
  validatorType: React.PropTypes.string,
  onInvalid: React.PropTypes.func,
  validationRegex: React.PropTypes.string,
};
