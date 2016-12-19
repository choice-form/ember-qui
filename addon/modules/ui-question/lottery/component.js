import Component from 'ember-component';
import layout from './template';
import $ from 'jquery';

export default Component.extend({
  layout,

  didInsertElement(){
    const lottery =  $('.lottery');
    lottery.css('padding','0');
    lottery.siblings().remove();
    $('button').prepend('<svg x="0" y="0" width="16px" height="16px" viewBox="0 0 16 16"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#gift"></use></svg>');
  }

}).reopenClass({positionalParams: ['node', 'handleEvents']});
