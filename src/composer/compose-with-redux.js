import React from 'react';
import shallowEqual from 'shallowequal';
import { extend, forOwn, mapValues, omit } from 'lodash';

function isNullOrUndefined(x) { return !(x != null); }

function composeWithRedux(ComposedComponent, FormName, formSchema) {
  const Container = class extends React.Component {
    constructor(props, context) {
      super(props, context);
      const formName = isNullOrUndefined(FormName) ? props.formName : FormName;
      this.state = { formName };
      this.onChange = this.onChange.bind(this);
      this.onAutoCompleteSelect = this.onAutoCompleteSelect.bind(this);
    }

    componentWillMount() {
      const { FormState } = this.props;
      /*
       * Here we will first copy the default data
       * then we will copy our props data that is coming
       * from outside onto it and set it inside our form
       * At this moment we are setting the data for
       * the first time.
       */
      if (isNullOrUndefined(this.state.formName)) {
        return;
      }
      const newFormData = {};
      extend(newFormData, this.getFormWithDefaultValues());
      if (this.props.data) {
        extend(newFormData, this.props.data);
      }
      FormState.initForm(newFormData, this.state.formName);
    }

    getFormWithDefaultValues() {
      let schema = this.props.formSchema;
      if (!schema) {
        schema = formSchema;
      }
      const form = {};
      if (schema) {
        forOwn(schema, (field) => {
          if (field && field.defaultValue) {
            form[field.docField] = field.defaultValue;
          }
        });
      }
      return form;
    }

    componentDidMount() {
      const { FormState } = this.props;
      this.mounted = true;
      this.unsubscribe = FormState.observeStore(
        (state) => state.forms[this.state.formName],
        (currentState) => {
          if (this.mounted) {
            this.setState({ payload: currentState });
          }
        }
      );
    }

    componentWillReceiveProps(newProps) {
      const { FormState } = this.props;
      let formName = this.state.formName;
      if (isNullOrUndefined(this.state.formName)) {
        formName = isNullOrUndefined(FormName) ? this.props.formName : FormName;
        this.setState({ formName });
      }
      /*
      * Here we are setting the default data first for the form
      * Then we are copying data already in the form onto it.
      * Then we replace new data that is coming from outside
      * onto it if there is any. Then we initialize the form
      * with it. This is not the first time we are setting the data.
      */
      const data = {};
      extend(data, this.getFormWithDefaultValues());
      extend(data, newProps.data);
      FormState.initForm(data, FormName);
    }

    componentWillUnmount() {
      this.unsubscribe();
      this.mounted = false;
      const { FormState } = this.props;
      FormState.deleteForm(this.state.formName);
    }

    shouldComponentUpdate(nextProps, nextState) {
      let shouldUpdate = (!shallowEqual(this.props, nextProps));
      shouldUpdate = shouldUpdate || (!shallowEqual(this.state.payload, nextState.payload));
      return shouldUpdate;
    }

    onAutoCompleteSelect(field, value) {
      const { FormState } = this.props;
      FormState.formFieldChange(field, value, this.state.formName);
    }

    onChange(field, value) {
      const { FormState } = this.props;
      FormState.formFieldChange(field, value, this.state.formName);
    }

    render() {
      const { FormState } = this.props;
      let schema = this.props.formSchema;
      if (!schema) {
        schema = formSchema;
      }
      const currentState = FormState.getForm(this.state.formName);
      const newSchema = mapValues(schema, (val) => {
        if (val.type === 'CODE_VALUE' || val.type === 'LIST' || val.type === 'AUTOCOMPLETE') {
          return { ...val,
            onChange: this.onChange,
            value: currentState[val.docField],
            onItemSelect: this.onAutoCompleteSelect };
        }
        return { ...val, onChange: this.onChange, value: currentState[val.docField] };
      });

      const newProps = omit(this.props,
        ['data', 'store', 'initForm', 'deleteForm', 'observeStore', 'formFieldChange']);
      return <ComposedComponent {...newProps} {...newSchema} currentState={currentState} />;
    }
  };

  Container.propTypes = {
    data: React.PropTypes.object,
    FormState: React.PropTypes.object,
    formSchema: React.PropTypes.any,
    formName: React.PropTypes.string,
  };

  const depsToPropsMapper = (context) => ({
    FormState: context.FormState,
  });
  return <Container />;
}

export default composeWithRedux;
