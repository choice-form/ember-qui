import Helper from 'ember-helper'
import { htmlSafe } from 'ember-string'
import device from 'device';

export const particle = (argv, {size = 'm'}) => {
  return device.android() || device.windows()
    ? ''
    : htmlSafe(`<div class="particle-wrapper ${size}">
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
};

export default Helper.helper(particle)
