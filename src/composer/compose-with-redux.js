import React from 'react';
import shallowEqual from 'shallowequal';
import { extend, forOwn, mapValues, omit } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FormActionCreators from '../actions/forms-action-creators';

const checkError = (validationResult) => {
  if (!validationResult) {
    return '';
  }

  if (!validationResult.result) {
    return validationResult.error;
  }
  return '';
};

function composeWithRedux(ComposedComponent, FormName, formSchema) {
  class Container extends React.Component {
    componentDidMount() {
      const { register } = this.props;
      /*
       * Here we will first copy the default data
       * then we will copy our props data that is coming
       * from outside onto it and set it inside our form
       * At this moment we are setting the data for
       * the first time.
       */
      const newFormData = {};
      if (this.props.data) {
        extend(newFormData, this.props.data);
      }
      register(newFormData, FormName, formSchema);
    }

    componentWillReceiveProps(newProps) {
      const { register } = this.props;
      /*
      * Here we are setting the default data first for the form
      * Then we are copying data already in the form onto it.
      * Then we replace new data that is coming from outside
      * onto it if there is any. Then we initialize the form
      * with it. This is not the first time we are setting the data.
      */
      const data = {};
      if (newProps.data) {
        extend(data, newProps.data);
        register(data, FormName, formSchema);
      }
    }

    shouldComponentUpdate(nextProps, nextState) {
      let shouldUpdate = (!shallowEqual(this.props, nextProps));
      shouldUpdate = shouldUpdate || (!shallowEqual(this.state.payload, nextState.payload));
      return shouldUpdate;
    }

    componentWillUnmount() {
      this.mounted = false;
      const { unregister } = this.props;
      unregister(FormName);
    }

    /*
    onAutoCompleteSelect(field, value) {
      const { FormState } = this.props;
      FormState.formFieldChange(field, value, this.state.formName);
    }*/

    onChange = (field, value) => {
      const { updateField } = this.props;
      updateField(field, value, FormName);
    };

    render() {
      const schema = formSchema;
      const form = this.props[FormName];
      const newSchema = mapValues(schema, (field) => {
        const fieldValue = form && form[field.name] ? form[field.name] : { value: undefined, validationResult: { result: true } };
        if (field.type === 'CODE_VALUE' || field.type === 'LIST' || field.type === 'AUTOCOMPLETE') {
          return { ...field,
            onChange: this.onChange,
            value: fieldValue.value,
            onItemSelect: this.onAutoCompleteSelect,
            errorText: checkError(fieldValue.validationResult),
          };
        }
        return {
          ...field,
          onChange: this.onChange,
          value: fieldValue.value,
          errorText: checkError(fieldValue.validationResult),
        };
      });

      const newProps = omit(this.props,
        [
          'data',
          'register',
          'unregister',
          'updateField',
          'addElementToArrayField',
          'removeElementFromArrayField',
        ]
      );
      return <ComposedComponent {...newProps} {...newSchema} />;
    }
  }

  Container.propTypes = {
    data: React.PropTypes.object,
    register: React.PropTypes.func,
    unregister: React.PropTypes.func,
    updateField: React.PropTypes.func,
  };

  return connect(
    state => state.Forms,
    dispatch => bindActionCreators(FormActionCreators, dispatch)
  )(Container);
}

export default composeWithRedux;
