const testCase = require('mocha').describe;
const assertions = require('mocha').it;
const expect = require('chai').expect;
const formsReducer = require('../lib/reducers/form-action-reducers').default;
const formActionCreators = require('../lib/actions/forms-action-creators').default;
const isFormValid = require('../lib/reducers/form-validation').isFormValid;

testCase('Forms reducer tests', () => {
  testCase('init form tests', () => {
    assertions('should return a form with empty data if initialized with empty data', () => {
      const state = formsReducer({}, formActionCreators.register({}, 'test', {}));
      expect(state).to.deep.equal({ test: { schema: {}, valid: true } });
    });

    assertions('should return false if form has a invalid field', () => {
      const form = {
        name: { value: 'John Snow', validationResult: { result: false } },
        description: { value: 'Commandar', validationResult: { result: true } },
        schema: {
          name: {},
          description: {},
        },
      };
      expect(isFormValid(form)).to.be.equal(false);
    });

    assertions('should return true if form has a valid field', () => {
      const form = {
        name: { value: 'John Snow', validationResult: { result: true } },
        description: { value: 'Commandar', validationResult: { result: true } },
        schema: {
          name: {},
          description: {},
        },
      };
      expect(isFormValid(form)).to.be.equal(true);
    });

    assertions('should override old form data with new one', () => {
      const state = formsReducer(
        {
          test: {
            firstName: { value: 'Suhail Ansari', validationResult: { result: true } },
            schema: {
              firstName: {
                fieldType: 'string',
              },
            },
          },
        },
        formActionCreators.register({}, 'test', {})
      );
      expect(state).to.deep.equal({ test: { schema: {}, valid: true } });
    });

    assertions('should validate and put correct data when initialized', () => {
      const schema = {
        firstName: {
          labelText: 'First name',
          name: 'firstName',
          fieldType: 'string',
        },
      };
      const data = {
        firstName: 'Suhail Ansari',
      };
      const result = {
        test: {
          firstName: { value: 'Suhail Ansari', validationResult: { result: true } },
          schema,
          valid: true,
        }
      };
      const state = formsReducer(
        {},
        formActionCreators.register(data, 'test', schema)
      );
      expect(state).to.deep.equal(result);
    });

    assertions('should validate and put correct numeric data when initialized', () => {
      const schema = {
        quantity: {
          labelText: 'Quantity',
          name: 'quantity',
          fieldType: 'number',
          type: 'number',
          decimalPlaces: 2,
        },
      };
      const data = {
        quantity: '123.222',
      };
      const result = {
        test: {
          quantity: { value: 123.22, validationResult: { result: true } },
          schema,
          valid: true,
        },
      };
      const state = formsReducer(
        {},
        formActionCreators.register(data, 'test', schema)
      );
      expect(state).to.deep.equal(result);
    });

    assertions('should validate and put correct numeric data when initialized', () => {
      const schema = {
        quantity: {
          labelText: 'Quantity',
          name: 'quantity',
          fieldType: 'number',
          type: 'number',
          required: true,
        },
      };
      const data = {
        quantity: 123,
      };
      const result = {
        test: {
          quantity: { value: 123, validationResult: { result: true } },
          schema,
          valid: true,
        },
      };
      const state = formsReducer(
        {},
        formActionCreators.register(data, 'test', schema)
      );
      expect(state).to.deep.equal(result);
    });

    assertions('should delete form when delete action is called', () => {
      const schema = {
        firstName: {
          labelText: 'First name',
          name: 'firstName',
          fieldType: 'string',
        }
      };
      const data = {
        firstName: 'Suhail Ansari',
      };
      const result = {
        test: {
          firstName: { value: 'Suhail Ansari', validationResult: { result: true } },
          schema,
          valid: true,
        }
      };
      let state = formsReducer(
        {},
        formActionCreators.register(data, 'test', schema)
      );
      expect(state).to.deep.equal(result);
      state = formsReducer(state, formActionCreators.unregister('test'));
      expect(state).to.deep.equal({});
    });

    assertions('should clear form when clear action is called.', () => {
      const schema = {
        firstName: {
          labelText: 'First name',
          name: 'firstName',
          fieldType: 'string',
        },
      };
      const data = {
        firstName: 'Suhail Ansari',
      };
      const result = {
        test: {
          firstName: { value: 'Suhail Ansari', validationResult: { result: true } },
          schema,
          valid: true,
        },
      };
      let state = formsReducer(
        {},
        formActionCreators.register(data, 'test', schema)
      );
      expect(state).to.deep.equal(result);
      state = formsReducer(
        state,
        formActionCreators.clear('test')
      );
      expect(state).to.deep.equal({
        test: {
          firstName: { value: undefined, validationResult: { result: true } },
          schema,
          valid: true,
        },
      });
    });
  });
});
