const testCase = require('mocha').describe;
const assertions = require('mocha').it;
const expect = require('chai').expect;
const formsReducer = require('../lib/reducers/form-action-reducers').default;
const formActionCreators = require('../lib/actions/forms-action-creators').default;

testCase('Forms reducer tests', () => {
  testCase('Update field tests', () => {
    assertions('should update state with new values', () => {
      const schema = {
        firstName: {
          fieldType: 'string',
        },
      };
      const result = {
        test: {
          firstName: { value: 'Suhail Ansari', validationResult: { result: true } },
          schema,
          valid: true,
        },
      };
      let state = formsReducer({}, formActionCreators.register({}, 'test', schema));
      expect(state).to.deep.equal({
        test: {
          firstName: {
            validationResult: { result: true },
            value: undefined,
          },
          schema,
          valid: true,
        },
      });
      state = formsReducer(state, formActionCreators.updateField('firstName', 'Suhail Ansari', 'test'));
      expect(state).to.deep.equal(result);
    });

    assertions('should not update state if field name or form name is null', () => {
      const schema = {
        firstName: {
          fieldType: 'string',
        },
      };

      const result = {
        test: {
          firstName: { value: undefined, validationResult: { result: true }},
          schema,
          valid: true,
        },
      };

      let state = formsReducer({}, formActionCreators.register({}, 'test', schema));
      expect(state).to.deep.equal(result);

      state = formsReducer(state, formActionCreators.updateField(null, 'Suhail Ansari', 'test'));
      expect(state).to.deep.equal(result);
      state = formsReducer(state, formActionCreators.updateField('firstName', 'Suhail Ansari', null));
      expect(state).to.deep.equal(result);
      state = formsReducer(state, formActionCreators.updateField(null, 'Suhail Ansari', null));
      expect(state).to.deep.equal(result);
    });

    assertions('should initialize an array field with empty array.', () => {
      const schema = {
        quantity: {
          fieldType: 'array',
        },
      };

      const result = {
        test: {
          quantity: { value: [], validationResult: { result: true } },
          schema,
          valid: true,
        },
      };

      const state = formsReducer({}, formActionCreators.register({}, 'test', schema));
      expect(state).to.deep.equal(result);
    });

    assertions('should update in an empty array', () => {
      const schema = {
        quantity: {
          fieldType: 'array',
        },
      };

      const result = {
        test: {
          quantity: { value: [], validationResult: { result: true } },
          schema,
          valid: true,
        },
      };

      const resultAfterAddition = {
        test: {
          quantity: { value: [2], validationResult: { result: true } },
          schema,
          valid: true,
        },
      };

      let state = formsReducer({}, formActionCreators.register({}, 'test', schema));
      expect(state).to.deep.equal(result);

      state = formsReducer(state, formActionCreators.addElementToArrayField('quantity', 2, 'test'));
      expect(state).to.deep.equal(resultAfterAddition);

      state = formsReducer(state, formActionCreators.removeElementFromArrayField('quantity', 0, 'test'));
      expect(state).to.deep.equal(result);
    });

    assertions('should not update state if element is removed from empty array', () => {
      const schema = {
        quantity: {
          fieldType: 'array',
        },
      };

      const result = {
        test: {
          quantity: { value: [], validationResult: { result: true } },
          schema,
          valid: true,
        },
      };

      const state = formsReducer({}, formActionCreators.register({}, 'test', schema));
      expect(state).to.not.equal(result);
      expect(state).to.deep.equal(result);
      const newState = formsReducer(state,
        formActionCreators.removeElementFromArrayField('quantity', 1, 'test'));
      expect(newState).to.be.equal(state);
    });
  });
});
