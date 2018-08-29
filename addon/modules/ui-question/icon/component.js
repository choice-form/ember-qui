import { get } from '@ember/object';
import { inject } from '@ember/service';
import { set } from '@ember/object';
import Component from '@ember/component';

import layout from './template';

export default Component.extend({
  layout,

  tagName: '',

  iconService: inject("icon-loader"),

  _renderIdCache: null,

  didReceiveAttrs(){
    if (this._renderIdCache !== this.option.renderId) {
      this._renderIdCache = this.option.renderId;
      get(this, 'iconService')
        .getIconByUrl(get(this, 'option.icon'), this.option.renderId)
        .then(icon => !this.isDestroyed && set(this, 'svg', icon))
    }
  },

  actions: {
    handleOptionClick(e){
      const success = this.handleEvents.handleOptionClick(get(this, 'option'), get(this, 'node'))
      !success && e.preventDefault();
    },
  }
}).reopenClass({ positionalParams: ['node', 'option', 'handleEvents']});
