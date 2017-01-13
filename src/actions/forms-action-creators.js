import ActionTypes from './forms-action-types.js';

export default {
  initFormAction(formData, formName) {
    return { type: ActionTypes.INIT_FORM, payload: { form: formName, data: formData } };
  },

  formFieldChangeAction(fieldName, fieldValue, formName) {
    return { type: ActionTypes.FORM_FIELD_CHANGE,
      payload: { form: formName, field: fieldName, value: fieldValue } };
  },

  clearFormAction(formName) {
    return { type: ActionTypes.CLEAR_FORM, payload: { form: formName, data: {} } };
  },

  deleteFormAction(formName) {
    return { type: ActionTypes.DELETE_FORM, payload: { form: formName } };
  },

  addArrayFieldAction(arrayField, valueToAdd, formName) {
    return { type: ActionTypes.ADD_VALUE_TO_ARRAY_FIELD,
      payload: { form: formName, field: arrayField, value: valueToAdd } };
  },

  removeArrayFieldAction(arrayField, index, formName) {
    return { type: ActionTypes.REMOVE_VALUE_FROM_ARRAY_FIELD,
      payload: { form: formName, field: arrayField, value: index } };
  },
};
