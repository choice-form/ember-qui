import Component from '@ember/component';
import layout from './template';
import { get } from '@ember/object';
import { inject } from '@ember/service';
import { set } from '@ember/object';

export default Component.extend({
  layout,
  tagName: '',
  iconService: inject("icon-loader"),

  didReceiveAttrs(args){
    this._super(...arguments);
    const renderId = args.newAttrs.option.renderId;
    get(this, 'iconService').getIconByUrl(get(this, 'option.icon'), renderId)
      .then(icon => !this.isDestroyed && set(this, 'svg', icon))
  },

  actions: {
    handleOptionClick(e){
      const success = this.handleEvents.handleOptionClick(get(this, 'option'), get(this, 'node'))
      !success && e.preventDefault();
    },
  }
}).reopenClass({ positionalParams: ['node', 'option', 'handleEvents']});
