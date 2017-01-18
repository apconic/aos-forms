const testCase = require('mocha').describe;
const assertions = require('mocha').it;
const expect = require('chai').expect;
const formsReducer = require('../lib/reducers/form-action-reducers').default;
const formActionCreators = require('../lib/actions/forms-action-creators').default;

testCase('Forms reducer tests', () => {
  testCase('init form tests', () => {
    assertions('should return a form with empty data if initialized with empty data', () => {
      const state = formsReducer({}, formActionCreators.init({}, 'test', {}));
      expect(state).to.deep.equal({ test: { schema: {} } });
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
        formActionCreators.init({}, 'test', {})
      );
      expect(state).to.deep.equal({ test: { schema: {} } });
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
        }
      };
      const state = formsReducer(
        {},
        formActionCreators.init(data, 'test', schema)
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
        }
      };
      let state = formsReducer(
        {},
        formActionCreators.init(data, 'test', schema)
      );
      expect(state).to.deep.equal(result);
      state = formsReducer(state, formActionCreators.delete('test'));
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
        },
      };
      let state = formsReducer(
        {},
        formActionCreators.init(data, 'test', schema)
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
        },
      });
    });
  });
});
