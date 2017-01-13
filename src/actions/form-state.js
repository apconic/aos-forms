import ActionCreators from './forms-action-creators.js';

export default class FormState {
  constructor(store) {
    this.store = store;
  }

  initForm(formData, formName) {
    const { dispatch } = this.store;
    dispatch(ActionCreators.initFormAction(formData, formName));
  }

  formFieldChange(fieldName, fieldValue, formName) {
    const { dispatch } = this.store;
    dispatch(ActionCreators.formFieldChangeAction(fieldName, fieldValue, formName));
  }

  clearForm(formName) {
    const { dispatch } = this.store;
    dispatch(ActionCreators.clearFormAction(formName));
  }

  deleteForm(formName) {
    const { dispatch } = this.store;
    dispatch(ActionCreators.deleteFormAction(formName));
  }

  addArrayField(arrayField, valueToAdd, formName) {
    const { dispatch } = this.store;
    dispatch(ActionCreators.addArrayFieldAction(arrayField, valueToAdd, formName));
  }

  removeArrayField(arrayField, index, formName) {
    const { dispatch } = this.store;
    dispatch(ActionCreators.removeArrayFieldAction(arrayField, index, formName));
  }

  observeStore(select, onChange) {
    let currentState;

    const handleChange = () => {
      const nextState = select(this.store.getState());
      if (nextState !== currentState) {
        currentState = nextState;
        onChange(currentState);
      }
    };
    const unsubscribe = this.store.subscribe(handleChange);
    handleChange();
    return unsubscribe;
  }

  /**
   * Gets state from local store
   * @param {string} name - name of the state
   * @return {object} current state (full state if name is undefined or null)
   */
  get(name) {
    if (!name) {
      const state = this.store.getState();
      return state;
    }
    return this.store.getState()[name];
  }

  /**
   * Gets form state
   * @param {string} name - name of the form
   * @return {object} State of the form (All forms are returned if name is undefined/null)
   */
  getForm(name) {
    if (!name) {
      return this.store.getState().forms;
    }
    return this.store.getState().forms[name];
  }
}
