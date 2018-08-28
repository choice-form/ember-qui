import { get } from '@ember/object';
import { inject } from '@ember/service';
import RSVP from 'rsvp';
import Service from '@ember/service';

function isValidUrl(url) {
  return /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi.test(url);
}

export default Service.extend({
  ajax: inject(),

  init() {
    this._super(...arguments);

    this._cache = {};
  },

  getIconByUrl(url,renderId) {
    if (!isValidUrl(url)) {
      return RSVP.reject();
    }

    if (this._cache[renderId+url]) {
      return RSVP.resolve(this._cache[renderId+url]);
    }

    return get(this, 'ajax')
      .request(url, { dataType: 'xml' })
      .then(res => this._cache[renderId+url] = res.children[0]);
  },
});
