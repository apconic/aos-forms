var expect = require('chai').expect;
var formsReducer = require('../lib/reducers/form-action-reducers').default;
var formActionCreators = require('../lib/actions/forms-action-creators').default;

console.log(formsReducer({}, {}));
describe('Forms reducer tests', function() {
  describe('init form tests', function() {
    it('should return a form with empty data if initialized with empty data', function() {
      const state = formsReducer({}, formActionCreators.init({}, 'test', {}));
      expect(state).to.deep.equal({ test: { schema: {} } });
    });
    
    it('should override old form data with new one', function() {
      const state = formsReducer(
        {
          test: {
            firstName: { value: 'Suhail Ansari', validationResult: { result: true } },
            schema: {
              firstName: {
                fieldType: 'string',
              }
            }
          }
        },
        formActionCreators.init({}, 'test', {})        
      );
      expect(state).to.deep.equal({ test: { schema: {} }});
    });

    it('should validate and put correct data when initialized', function() {
      const schema = {
        firstName: {
          labelText: 'First name',
          name: 'firstName',
          fieldType: 'string'
        }
      };
      const data = {
        firstName: 'Suhail Ansari'
      };
      const result = {
        test: {
          firstName: {value: 'Suhail Ansari', validationResult: { result: true }},
          schema
        }
      };
      const state = formsReducer(
        {},
        formActionCreators.init(data, 'test', schema)
      );
      expect(state).to.deep.equal(result);
    });

    it('should clear form when clear action is called.', function() {
      const schema = {
        firstName: {
          labelText: 'First name',
          name: 'firstName',
          fieldType: 'string'
        }
      };
      const data = {
        firstName: 'Suhail Ansari'
      };
      const result = {
        test: {
          firstName: {value: 'Suhail Ansari', validationResult: { result: true }},
          schema
        }
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
          firstName: { value: undefined, validationResult: { result: true }},
          schema,
        }
      });
    });
  });
});
