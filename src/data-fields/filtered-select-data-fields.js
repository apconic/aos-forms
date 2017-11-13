import React from 'react';
import PropTypes from 'prop-types';
import { differenceWith } from 'lodash';
import SelectDataField from './select-data-field';

const FilteredSelectDataField = (props) => {
  const { initialArray, filterArray, filterFunction, ...other } = props;
  const filteredArray = differenceWith(initialArray, filterArray, filterFunction);
  return (
    <SelectDataField {...other} menuItems={filteredArray} />
  );
};

FilteredSelectDataField.propTypes = {
  initialArray: PropTypes.array,
  filterArray: PropTypes.array,
  filterFunction: PropTypes.func,
};

export default FilteredSelectDataField;
