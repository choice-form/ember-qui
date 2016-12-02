import Helper from 'ember-helper'
import { htmlSafe } from 'ember-string'

export const svgitem = ([name], {size = '16px', viewBox = '16', iconClass = null}) => {
  return iconClass
    ? htmlSafe(`<svg x="0" y="0" width="${size}" height="${size}" viewBox="0 0 ${viewBox} ${viewBox}" class="${iconClass}"><use xlink:href="#${name}"></use></svg>`)
    : htmlSafe(`<svg x="0" y="0" width="${size}" height="${size}" viewBox="0 0 ${viewBox} ${viewBox}"><use xlink:href="#${name}"></use></svg>`)
}

export default Helper.helper(svgitem)
