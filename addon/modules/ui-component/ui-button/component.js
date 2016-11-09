import Component from 'ember-component';
import layout from './template';

export default Component.extend({
  layout,
  tagName: 'button',
  classNames: ['ui-button', 'button'],
  classNameBindings: ['className'],
  className: "",

  size: '16px',
  viewBox: '16',

  click(){
    this.handleClick && this.handleClick();
  }
});
