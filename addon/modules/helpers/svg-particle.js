import Helper from 'ember-helper'
import { htmlSafe } from 'ember-string'

export const particle = (argv, { values = '0;29', duration = '0.55s' }) => {
  const renderId = (new Date()).valueOf() * Math.random(100);
  return htmlSafe(`
<div class="svg-particle">
  <svg x="0px" y="0px" width="60px" height="60px" viewBox="0 0 60 60">
    <g id="svg-particle" transform="translate(30, 30)">
      <g id=${renderId}>
        <rect width="29" height="1" x="0" y="0" rx="15" ry="15" fill-opacity="0">
          <animate
            id="x"
            attributeName="x"
            values=${values}
            keySplines="0.5 0 0 0.8"
            keyTimes="0;1"
            dur=${duration}
            begin="0.08s"
            repeatCount="1"
            fill="freeze">
          </animate>
          <animate
            id="width"
            attributeName="width"
            values="0;8.7;0"
            keySplines="0.895 0.03 0.685 0.22
                        0.895 0.03 0.685 0.22"
            keyTimes="0;0.325;1"
            dur=${duration}
            begin="x.begin"
            repeatCount="1"
            fill="freeze">
          </animate>
          <animate
            id="opacity"
            attributeName="fill-opacity"
            values="0;1;1;0"
            keyTimes="0;0.05;0.8;1"
            dur=${duration}
            begin="x.begin"
            repeatCount="1"
            fill="freeze">
          </animate>
        </rect>
      </g>
      <g>
        <use transform="rotate(45)"  xlink:href="#${renderId}"></use>
        <use transform="rotate(90)"  xlink:href="#${renderId}"></use>
        <use transform="rotate(135)" xlink:href="#${renderId}"></use>
        <use transform="rotate(180)" xlink:href="#${renderId}"></use>
        <use transform="rotate(225)" xlink:href="#${renderId}"></use>
        <use transform="rotate(270)" xlink:href="#${renderId}"></use>
        <use transform="rotate(315)" xlink:href="#${renderId}"></use>
      </g>
    </g>
  </svg>
</div>`)
}

export default Helper.helper(particle)
