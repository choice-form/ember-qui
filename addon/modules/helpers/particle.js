import Helper from 'ember-helper'
import { htmlSafe } from 'ember-string'

export const particle = ({size = 'm'}) => {
  return htmlSafe(`<div class="particle-wrapper ${size}">
            <ul class="particle-container">
              <li class="particle-item"></li>
              <li class="particle-item"></li>
              <li class="particle-item"></li>
              <li class="particle-item"></li>
              <li class="particle-item"></li>
              <li class="particle-item"></li>
              <li class="particle-item"></li>
              <li class="particle-item"></li>
            </ul>
          </div>`);
}

export default Helper.helper(particle)
