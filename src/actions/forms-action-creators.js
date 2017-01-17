import ActionTypes from './forms-action-types.js';

export default {
  init(formData, formName, formSchema) {
    return { type: ActionTypes.INIT_FORM, payload: { form: formName, data: formData, schema: formSchema } };
  },

  clear(formName) {
    return { type: ActionTypes.CLEAR_FORM, payload: { form: formName, data: {} } };
  },

  delete(formName) {
    return { type: ActionTypes.DELETE_FORM, payload: { form: formName } };
  },

  updateField(fieldName, fieldValue, formName) {
    return { type: ActionTypes.FORM_FIELD_CHANGE,
      payload: { form: formName, field: fieldName, value: fieldValue } };
  },

  addElementToArrayField(arrayField, valueToAdd, formName) {
    return { type: ActionTypes.ADD_VALUE_TO_ARRAY_FIELD,
      payload: { form: formName, field: arrayField, value: valueToAdd } };
  },

  removeElementFromArrayField(arrayField, index, formName) {
    return { type: ActionTypes.REMOVE_VALUE_FROM_ARRAY_FIELD,
      payload: { form: formName, field: arrayField, value: index } };
  },
};
