// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shallowEqual from 'shallowequal';
import { extend, mapValues } from 'lodash';
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

const defaultDataTransform = data => data;
function composeWithRedux(
  FormName: string,
  formSchema: any,
  dataTransform: any = defaultDataTransform
  ) {
  return (ComposedComponent: any) => {
    class Container extends Component {
      static propTypes = {
        data: PropTypes.object,
        register: PropTypes.func,
        unregister: PropTypes.func,
        updateField: PropTypes.func,
      };

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
          extend(newFormData, dataTransform(this.props.data));
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
        if (newProps.formData) {
          extend(data, dataTransform(newProps.formData));
          register(data, FormName, formSchema);
        }
      }

      shouldComponentUpdate(nextProps, nextState) {
        let shouldUpdate = (!shallowEqual(this.props, nextProps));
        if (this.state && nextState) {
          shouldUpdate = shouldUpdate || (!shallowEqual(this.state.payload, nextState.payload));
        }
        return shouldUpdate;
      }

      componentWillUnmount() {
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
          const valueForUndefinedField = { value: undefined, validationResult: { result: true } };
          const fieldValue = form && form[field.name] ? form[field.name] : valueForUndefinedField;
          return {
            ...field,
            onChange: this.onChange,
            value: fieldValue.value,
            errorText: checkError(fieldValue.validationResult),
          };
        });

        const formValues = mapValues(schema, (field) => {
          const fieldValue = form && form[field.name] ? form[field.name].value : undefined;
          return fieldValue;
        });

        const formValid = form && form.valid ? form.valid : false;
        return (<ComposedComponent
          {...this.props}
          {...newSchema}
          valid={formValid}
          formValues={formValues}
        />);
      }
    }

    return connect(
      state => state.Forms,
      dispatch => bindActionCreators(FormActionCreators, dispatch)
    )(Container);
  };
}

export default composeWithRedux;
