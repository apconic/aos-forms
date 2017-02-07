const testCase = require('mocha').describe;
const assertions = require('mocha').it;
const expect = require('chai').expect;
const util = require('../lib/util').default;

testCase('Forms reducer tests', () => {
  testCase('util getDefaultValues function tests', () => {
    assertions('should return default values for schema', () => {
      const schema = {
        firstName: { name: 'firstName', defaultValue: 'Jon Snow' },
        description: { name: 'description' },
      };
      const defaultValues = util.getDefaultValues(schema);
      expect(defaultValues).to.eql({ firstName: 'Jon Snow' });
    });
  });

  testCase('Util fixDouble should fix decimal places', () => {
    assertions('should return value with correct decimal places', () => {
      const val = util.fixDouble(123.222, 2);
      expect(val).to.eql(123.22);
    });
  });
});
