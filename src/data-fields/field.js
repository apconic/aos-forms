import React from 'react';
import { DisplayMessages } from '../messages';
import validator from 'validator';
import { trim, toNumber } from 'lodash';

export default class Field extends React.Component {
  checkBlank(text) {
    const trimmedText = text || text === 0 ? trim(text) : undefined;
    return (!(text || text === 0) || (trimmedText.length === 0));
  }

  fieldIsInvalid() {
    const { onInvalid, displayName, docField } = this.props;
    if (onInvalid) {
      onInvalid(true, displayName, docField);
    }
  }

  fieldIsValid() {
    const { onInvalid, displayName, docField } = this.props;
    if (onInvalid) {
      onInvalid(false, displayName, docField);
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
  displayName: React.PropTypes.string,
  value: React.PropTypes.any,
  docField: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  isRequired: React.PropTypes.bool,
  minValue: React.PropTypes.number,
  maxValue: React.PropTypes.number,
  decimalPlaces: React.PropTypes.number,
  validatorType: React.PropTypes.string,
  onInvalid: React.PropTypes.func,
  validationRegex: React.PropTypes.string,
};
