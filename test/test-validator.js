const testCase = require('mocha').describe;
const assertions = require('mocha').it;
const expect = require('chai').expect;
const { validateDataAgainstSchema } = require('../lib/reducers/form-validation');

testCase('Forms validator tests', () => {
  testCase('Number field validator tests', () => {
    assertions('should return valid for schema', () => {
      const schema = {
        name: 'Quantity',
        fieldType: 'number',
      };
      const result = validateDataAgainstSchema('Quantity', 20, schema);
      expect(result).to.deep.equal({ result: true });
    });
    assertions('should return valid for schema where field is mandatory', () => {
      const schema = {
        name: 'Quantity',
        fieldType: 'number',
        isRequired: true ,
      };
      const result = validateDataAgainstSchema('Quantity', 20, schema);
      expect(result).to.deep.equal({ result: true });
    });
    assertions('should return invalid for schema where field is mandatory and value is null', () => {
      const schema = {
        name: 'Quantity',
        fieldType: 'number',
        isRequired: true,
      };
      const result = validateDataAgainstSchema('Quantity', null, schema);
      expect(result).to.deep.equal({ result: false, error: '*Required' });
    });
    assertions('should return invalid for schema where field is mandatory and value is undefined', () => {
      const schema = {
        name: 'Quantity',
        fieldType: 'number',
        isRequired: true,
      };
      const result = validateDataAgainstSchema('Quantity', undefined, schema);
      expect(result).to.deep.equal({ result: false, error: '*Required' });
    });
  });
});
