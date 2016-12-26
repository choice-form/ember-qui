import Service from 'ember-service';
import inject from 'ember-service/inject';
import get from 'ember-metal/get';
import RSVP from 'rsvp';

function isValidUrl(url) {
  return /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi.test(url);
}

export default Service.extend({
  ajax: inject(),

  _cache: {},

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
