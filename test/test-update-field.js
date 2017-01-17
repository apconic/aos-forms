var expect = require('chai').expect;
var formsReducer = require('../lib/reducers/form-action-reducers').default;
var formActionCreators = require('../lib/actions/forms-action-creators').default;

console.log(formsReducer({}, {}));
describe('Forms reducer tests', function() {
  describe('Update field tests', function() {
    it('should update state with new values', function() {
      const schema = {
        firstName: {
          fieldType: 'string',
        }
      };
      const result = {
        test: {
          firstName: { value: 'Suhail Ansari', validationResult: { result: true }},
          schema,
        },
      };
      let state = formsReducer({}, formActionCreators.init({}, 'test', schema));
      expect(state).to.deep.equal({
        test: {
          firstName: {
            validationResult: { result: true },
            value: undefined,
          },
          schema
        }
      });
      state = formsReducer(state, formActionCreators.updateField('firstName', 'Suhail Ansari', 'test'));
      expect(state).to.deep.equal(result);
    });

    it('should not update state if field name or form name is null', function() {
      const schema = {
        firstName: {
          fieldType: 'string',
        }
      };

      const result = {
        test: {
          firstName: { value: undefined, validationResult: { result: true }},
          schema,
        }
      };

      let state = formsReducer({}, formActionCreators.init({}, 'test', schema));
      expect(state).to.deep.equal(result);

      state = formsReducer(state, formActionCreators.updateField(null, 'Suhail Ansari', 'test'));
      expect(state).to.deep.equal(result);
      state = formsReducer(state, formActionCreators.updateField('firstName', 'Suhail Ansari', null));
      expect(state).to.deep.equal(result);
      state = formsReducer(state, formActionCreators.updateField(null, 'Suhail Ansari', null));
      expect(state).to.deep.equal(result);
    });
  });
});