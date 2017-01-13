import React from 'react';
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
  initialArray: React.PropTypes.array,
  filterArray: React.PropTypes.array,
  filterFunction: React.PropTypes.func,
};

export default FilteredSelectDataField;
