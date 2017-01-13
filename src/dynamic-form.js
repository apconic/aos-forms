import React from 'react';

const { Component } = React;
export default class DynamicForm extends Component {
  constructor(props) {
    super(props);
    this.invalidFields = [];
    this.onInvalid = this.onInvalid.bind(this);
  }

  onInvalid(isInvalid, displayName, docField) {
    if (isInvalid) {
      const field = this.invalidFields.find((element) => (element.docField === docField));
      if (!field) {
        this.invalidFields.push({ displayName, docField });
      }
    } else {
      const index = this.invalidFields.findIndex((element) => (element.docField === docField));
      if (index >= 0) {
        this.invalidFields = [...this.invalidFields.slice(0, index),
          ...this.invalidFields.slice(index + 1)];
      }
    }
  }

  validate() {
    if (this.invalidFields && this.invalidFields.length > 0) {
      return `${this.invalidFields[0].displayName} is invalid.`;
    }
    return '';
  }

  render() {
    return;
  }
}
