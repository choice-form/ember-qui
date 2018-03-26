import Helper from 'ember-helper'

export const listRateOptionChecked = ([optionValue, rateOptionValue]) => {
  if (optionValue !== "") {
    if (optionValue >= 0) {
      return rateOptionValue >= 0 && optionValue >= rateOptionValue;
    }
    return rateOptionValue <= 0 && optionValue <= rateOptionValue;
  }
  return false
}

export default Helper.helper(listRateOptionChecked)
