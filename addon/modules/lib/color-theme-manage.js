import colorAlpha from './color-transform';

/* eslint-disable no-unused-vars */
export default function themesColor(primary = 'rgba(128,128,128,1)', secondary = 'rgba(255,255,255,1)', contrast = 'rgba(202,32,39,1)', neutrals = 'rgba(128,128,128,1)') {

  const primaryAlpha01 = colorAlpha(primary, 0.1);
  const primaryAlpha03 = colorAlpha(primary, 0.3);
  const primaryAlpha05 = colorAlpha(primary, 0.5);

  const style = `
  /*------------------- layout -------------------*/
    body {
      color: ${primary};
      background-color: ${secondary};
    }
    .row:before {
      color: ${contrast};
    }
    textarea::-webkit-input-placeholder,
    input::-webkit-input-placeholder {
      color: ${primaryAlpha05};
    }
    input:checked + label {
      color: ${contrast};
    }
    /*------------------- ui-question -------------------*/
    .welcome.full-screen-cover:before {
      background: linear-gradient(to bottom, ${colorAlpha(primary, 0)} 0, ${primary} 100%);
    }
    .welcome.full-screen-cover .header {
      color: ${secondary};
      border-color: ${secondary};
    }
    .ui-text input:not(.ui-menu):focus {
      border-color: ${contrast};
      box-shadow: inset 0 0 0 3px ${colorAlpha(contrast, 0.1)} !important;
    }
    .ui-text.dropdown input {
      box-shadow: 0 2px 0 0 ${primaryAlpha05};
    }
    .ui-text.dropdown input:hover {
      box-shadow: 0 2px 0 0 ${primary};
    }
    .rating .ui-rating .rating-wrapper {
      background-color: ${primaryAlpha01};
    }
    .rating .ui-rating .rating-wrapper input:checked + label {
      color: ${contrast};
    }
    .picture-layout.insert-block .pic-description {
      color: ${secondary};
      background-color: ${primaryAlpha05};
    }
    .picture-layout .ui-picture input:checked + label .attachment:after {
      box-shadow: inset 0 0 0 2px ${contrast}, inset 0 0 0 4px ${secondary};
    }
    .picture-layout .ui-picture label .attachment:before {
      border-top: 4.5rem solid ${colorAlpha(secondary, 0.9)};
    }
    .picture-layout .object-fit {
      background-color: ${primaryAlpha03};
    }
    .picture-layout.superscript.insert-block .pic-description {
      color: inherit;
    }
    .picture-layout.superscript.insert-block .pic-description > span {
      color: ${secondary};
      background-color: ${primaryAlpha05};
    }
    .location .pin label {
      color: ${secondary};
      background-color: ${contrast};
    }
    .location .pin.positioning label {
      color:  ${contrast};
      background-color:  ${secondary};
    }
    .location .pin.failed label {
      color:  ${primary};
      background-color: ${secondary};
    }
    .file-upload .upload-image-icon {
      fill: ${primaryAlpha05}
    }
    .file-upload .upload-progress {
      background-color: ${contrast};
    }
    .icon .ui-icon input:checked + label {
      color: ${contrast};
    }
    .icon .ui-icon input:checked + label .svg-wrapper svg path {
      fill: ${contrast};
    }
    .icon .ui-icon label svg path {
      fill: ${primary};
    }
    .icon .ui-icon .labels {
      border-top: 2px solid ${primaryAlpha01}
    }
    .reward-container .reward-header > h2 {
      color: ${contrast};
      border-bottom: 1px solid ${primaryAlpha05};
    }
    .reward-container .reward-header .reward-contents {
      border-bottom: 1px solid ${primaryAlpha05};
    }
    .reward-container .reward-header .reward-contents .current-time {
      color: ${primaryAlpha05}
    }
    .reward-container .currency input:checked + label {
      color: ${secondary};
      background-color: ${contrast};
    }
    .reward-container .currency label {
      color: ${contrast};
      border: 2px solid ${contrast};
    }
    .reward-container .reward-additional .disclaimer {
      color: ${primaryAlpha05}
    }
    .reward-container .reward-additional .disclaimer-contents {
      border-top: 1px solid ${primaryAlpha05}
    }
    .ranking .ui-ranking .ranking-rank {
      box-shadow: inset 0 0 0 1px ${primaryAlpha05}, 0 2px 4px 0 ${primaryAlpha03};
    }
    .ranking .ui-ranking .ranking-rank.sortable-chosen.complete,
    .ranking .ui-ranking .ranking-rank.sortable-chosen {
      box-shadow: inset 0 0 0 1px ${primaryAlpha05}, 0 4px 8px 0 ${primaryAlpha03};
    }
    .ranking .ui-ranking .ranking-rank.complete {
      box-shadow: inset 0 0 0 1px ${primaryAlpha05}, 0 1px 3px 0 ${primaryAlpha03};
    }
    .ranking .ui-ranking .ranking-rank.complete label .effect-container {
      color: ${contrast};
    }
    .ranking .ui-ranking .ranking-rank.complete .ranking-number:before {
      color: ${primaryAlpha05};
    }
    .matrix .ui-matrix .fix-header:after {
      background-color: ${secondary};
    }
    .matrix .ui-matrix .swiper-pagination-bullet-active {
      background-color: ${contrast};
    }
    .matrix .ui-matrix .matrix-thumbnail ul li.active span {
      background-color: ${contrast};
    }
    .matrix .ui-matrix .matrix-thumbnail ul li span {
      background-color: ${primaryAlpha03}
    }
    .matrix .ui-matrix .swiper-button-disabled svg {
      fill: ${primaryAlpha05};
    }
    .matrix .ui-matrix .matrix-thumbnail {
      background-color: ${secondary};
    }
    /*------------------- ui-addon -------------------*/
    .progress-bar {
      background-color: ${colorAlpha(secondary, 0.9)};
    }
    .progress-bar .progress-wrapper:before {
      background-color: ${primaryAlpha03};
    }
    .progress-bar .progress-wrapper .progress {
      background-color: ${contrast};
    }
    .count-down .count-down-wrapper div {
      background-color: ${secondary};
      box-shadow: inset 0 0 0 1px ${primaryAlpha01}, 0 4px 4px -2px ${primaryAlpha03};
    }
    sup {
      color: ${primaryAlpha05};
    }
    sup > span {
      color: ${secondary};
      background-color: ${primaryAlpha05};
    }
    .warning {
      background: linear-gradient(to bottom, ${colorAlpha(secondary, 0.7)} 0, ${secondary} 80%);
    }
    .warning .warning-wrapper {
      color: ${secondary};
      background-color: ${colorAlpha(primary, 0.8)};
    }
    .warning .warning-wrapper strong {
      color: ${primary};
      background-color: ${secondary};
    }
    .warning .warning-wrapper.error {
      background-color: ${colorAlpha(contrast, 0.8)};
    }
    .ui-notification .notification {
      color: ${secondary};
      box-shadow: 0 4px 4px 0 ${primaryAlpha03};
    }
    .ui-notification .instance.info .notification {
      background-color: ${primary};
    }
    .ui-notification .instance.warning .notification {
      background-color: ${contrast};
    }
    .full-screen-loading {
      background-color: ${secondary};
    }
    .disclaimer-contents .disclaimer-close {
      background-color: ${primaryAlpha05};
      box-shadow: 0 4px 4px 0 ${primaryAlpha05};
    }
    /*------------------- ui-component -------------------*/
    .icon-button {
      transition: color 200ms ease;
    }
    .icon-button.primary {
      color: ${primaryAlpha05};
    }
    .icon-button.contrast {
      color: ${colorAlpha(contrast, 0.5)};
    }
    .button {
      transition: background-color 200ms ease, color 200ms ease, border 200ms ease;
    }
    .button.primary {
      color: ${secondary};
      background-color: ${primary};
    }
    .button.secondary {
      color: ${primary};
      border: 1px solid ${primary};
    }
    .button.contrast {
      color: ${secondary};
      background-color: ${contrast};
    }
    button {
      background-color: transparent;
    }
    button:active {
      background-color: ${primaryAlpha03};
    }
    ::selection {
      color: ${secondary};
      background-color: ${primary};
    }
    /*------------------- responsive -------------------*/
    html.desktop article {
      background-color: ${secondary};
    }
    html.desktop .icon-button.primary:hover {
      color: ${primary};
    }
    html.desktop .icon-button.contrast:hover {
      color: ${contrast};
    }
    html.desktop .button.primary:hover {
      color: ${secondary};
      background-color: ${neutrals};
    }
    html.desktop .button.secondary:hover {
      color: ${secondary};
      background-color: ${primary};
    }
    html.desktop .button.contrast:hover {
      background-color: ${primary};
    }
    html.desktop .ui-choice label:before {
      background-color: ${primary};
    }
    html.desktop .ui-text input:not(.ui-menu):hover {
      box-shadow: inset 0 0 0 3px ${primaryAlpha01};
    }
    html.desktop .ui-picture input:not(:checked) + label:hover .attachment:after {
      background-color: ${colorAlpha(secondary, 0.1)};
      box-shadow: inset 0 0 0 1px ${secondary}, inset 0 0 0 2px ${primary};
    }
    html.desktop .thumb-wrapper .thumb-item:hover a:after {
      background-color: ${colorAlpha(secondary, 0.1)};
      box-shadow: inset 0 0 0 1px ${secondary}, inset 0 0 0 2px ${primary};
    }
    html.desktop .ui-ranking .ranking-rank:hover {
      box-shadow: inset 0 0 0 1px ${primary}, 0 3px 6px 0 ${primaryAlpha03};
    }
    html.desktop .disclaimer a:hover {
      color: ${contrast};
    }
    html.desktop .disclaimer-close:hover {
      color: ${secondary};
      background-color: ${primary};
    }
    html.tablet.portrait body,
    html.mobile.landscape body,
    html.mobile.portrait body {
      background-color: ${primaryAlpha01};
    }
    html.tablet.portrait .attachment.header,
    html.mobile.landscape .attachment.header,
    html.mobile.portrait .attachment.header {
      box-shadow: 0 4px 4px 0 ${primaryAlpha03};
    }
    html.tablet.portrait .reward,
    html.mobile.landscape .reward,
    html.mobile.portrait .reward,
    html.tablet.portrait .reward-header,
    html.mobile.landscape .reward-header,
    html.mobile.portrait .reward-header,
    html.tablet.portrait .wrapper,
    html.mobile.landscape .wrapper,
    html.mobile.portrait .wrapper {
      background-color: ${secondary};
      box-shadow: 0 4px 4px 0 ${primaryAlpha03};
    }
    html.tablet.portrait .wechat-profile,
    html.mobile.landscape .wechat-profile,
    html.mobile.portrait .wechat-profile {
      background-color: ${secondary};
    }
    html.tablet .icon-button.primary:active,
    html.mobile .icon-button.primary:active {
      color: ${primary};
    }
    html.tablet .icon-button.contrast:active,
    html.mobile .icon-button.contrast:active {
      color: ${contrast};
    }
    html.tablet .button.primary:active,
    html.mobile .button.primary:active {
      color: ${secondary};
      background-color: ${neutrals};
    }
    html.tablet .button.secondary:active,
    html.mobile .button.secondary:active {
      color: ${secondary};
      background-color: ${primary};
    }
    html.tablet .button.contrast:active,
    html.mobile .button.contrast:active {
      background-color: ${primary};
    }
    html.mobile.portrait .submit-actions button:only-of-type,
    html.mobile.portrait .submit-actions button:nth-of-type(2) {
      color: ${secondary};
      background-color: ${contrast};
    }
    html.mobile.portrait .submit-actions button:only-of-type:active,
    html.mobile.portrait .submit-actions button:nth-of-type(2):active {
      background-color: ${colorAlpha(contrast, 0.8)};
    }
    html.mobile.portrait footer {
      border-color: ${primaryAlpha03};
    }
    html.mobile.portrait footer svg {
      fill: ${contrast};
    }
    /*------------------- nouislider -------------------*/
    .noUi-background {
      background: ${secondary};
      box-shadow: 0 0 0 1px ${colorAlpha(secondary, 0.5)}, 0 0 0 1px ${primary};
    }
    .noUi-connect {
      background: ${contrast};
    }
    .noUi-target.noUi-connect {
      box-shadow: 0 0 0 1px ${contrast};
    }
    .noUi-handle {
      border: 1px solid ${primaryAlpha05};
      background: ${secondary};
      box-shadow: inset 0 0 1px ${secondary}, inset 0 1px 7px ${primaryAlpha01}, 0 3px 6px -3px ${primaryAlpha05};
    }
    .noUi-active {
      box-shadow: inset 0 0 1px ${secondary}, inset 0 1px 7px ${primaryAlpha05}, 0 3px 6px -3px ${primaryAlpha05};
    }
    .noUi-handle:after,
    .noUi-handle:before {
      background: ${primaryAlpha05};
    }
    [disabled] .noUi-connect,
    [disabled].noUi-connect {
      background: #b8b8b8;
    }
    .noUi-pips {
      color: #999;
    }
    .noUi-value-sub {
      color: #ccc;
    }
    .noUi-marker {
      background: #ccc;
    }
    .noUi-marker-large,
    .noUi-marker-sub {
      background: #aaa;
    }
    .noUi-tooltip {
      border: 1px solid #d9d9d9;
      background: #fff;
}`;

  document.getElementById('themesColor').innerText = style;
}
