import ActionTypes from '../actions/forms-action-types';
import { isArray } from 'lodash';

const changeFormField = (forms, payload) => {
  const newFormData = { ...forms[payload.form], [payload.field]: payload.value };
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
  return { ...forms, [payload.form]: { ...forms[payload.form], [payload.field]: newArray } };
};

const removeValueFromArrayField = (forms, payload) => {
  if (!payload.form &&
    !payload.field &&
    !payload.value &&
    !isArray(payload.field)) {
    return forms;
  }
  const form = forms[payload.form];
  const newArray = [...form[payload.field].slice(0, payload.value),
  ...form[payload.field].slice(payload.value + 1)];
  return { ...forms, [payload.form]: { ...forms[payload.form], [payload.field]: newArray } };
};

const addForm = (forms, payload) => (
  { ...forms, [payload.form]: payload.data }
);

const deleteFormFromState = (forms, payload) => {
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
      return addForm(state, action.payload);
    case ActionTypes.DELETE_FORM:
      return deleteFormFromState(state, action.payload);
    default:
      return state;
  }
};
