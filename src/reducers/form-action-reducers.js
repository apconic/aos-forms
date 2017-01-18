import { isArray, cloneDeep } from 'lodash';
import ActionTypes from '../actions/forms-action-types';
import { validateSingleField, validateObject } from './form-validation';
import { isNullOrUndefined } from '../data-fields/util';

const changeFormField = (forms, payload) => {
  if (isNullOrUndefined(payload.form) || isNullOrUndefined(payload.field)) {
    return forms;
  }

  const form = forms[payload.form];
  if (isNullOrUndefined(form)) {
    return forms;
  }
  const fieldData = validateSingleField(
    payload.field,
    payload.value,
    form.schema[payload.field]
  );

  if (isNullOrUndefined(fieldData)) {
    return forms;
  }
  const newFormData = { ...forms[payload.form], [payload.field]: fieldData };
  const newForms = { ...forms, [payload.form]: newFormData };
  return newForms;
};

const addValueToArrayField = (forms, payload) => {
  if (!payload.form &&
    !payload.field &&
    !payload.value &&
    !isArray(payload.field)) {
    return forms;
  }
  const form = forms[payload.form];
  const newArray = form[payload.field] ? [...form[payload.field], payload.value] : [payload.value];
  return {
    ...forms,
    [payload.form]: {
      ...forms[payload.form],
      [payload.field]: { value: newArray, validationResult: { result: true } }, 
    } 
  };
};

const removeValueFromArrayField = (forms, payload) => {
  if (!payload.form &&
    !payload.field &&
    !payload.value &&
    !isArray(payload.field)) {
    return forms;
  }
  const form = forms[payload.form];
  if (isNullOrUndefined(form[payload.field])
      || !isArray(form[payload.field].value)
  ) {
    return forms;
  }

  if (payload.value >= form[payload.field].value.length) {
    return forms;
  }

  const newArray = [
    ...form[payload.field].value.slice(0, payload.value),
    ...form[payload.field].value.slice(payload.value + 1),
  ];
  return {
    ...forms,
    [payload.form]: {
      ...forms[payload.form],
      [payload.field]: { value: newArray, validationResult: { result: true } },
    },
  };
};

const addForm = (forms, payload) => {
  if (isNullOrUndefined(payload.form) || isNullOrUndefined(payload.schema)) {
    return forms;
  }
  const data = validateObject(payload.data, payload.schema);
  const formData = { ...data };
  formData.schema = cloneDeep(payload.schema);
  return { ...forms, [payload.form]: formData };
};

const clearForm = (forms, payload) => {
  if (isNullOrUndefined(payload.form)) {
    return forms;
  }
  const oldFormData = forms[payload.form];
  if (isNullOrUndefined(oldFormData)) {
    return forms;
  }

  const data = validateObject({}, oldFormData.schema);
  const formData = { ...data };
  formData.schema = cloneDeep(oldFormData.schema);
  return { ...forms, [payload.form]: formData };
};

const deleteFormFromState = (forms, payload) => {
  if (isNullOrUndefined(payload) || isNullOrUndefined(payload.form)) {
    return forms;
  }
  const newState = { ...forms };
  if (newState[payload.form]) {
    delete newState[payload.form];
  }
  return newState;
};

export default (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.INIT_FORM:
      return addForm(state, action.payload);
    case ActionTypes.FORM_FIELD_CHANGE:
      return changeFormField(state, action.payload);
    case ActionTypes.ADD_VALUE_TO_ARRAY_FIELD:
      return addValueToArrayField(state, action.payload);
    case ActionTypes.REMOVE_VALUE_FROM_ARRAY_FIELD:
      return removeValueFromArrayField(state, action.payload);
    case ActionTypes.CLEAR_FORM:
      return clearForm(state, action.payload);
    case ActionTypes.DELETE_FORM:
      return deleteFormFromState(state, action.payload);
    default:
      return state;
  }
};
