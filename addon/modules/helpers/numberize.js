import Helper from 'ember-helper'

export const numberize = ([value]) => {
  return window.parseInt(value, 10)
}

export default Helper.helper(numberize)
