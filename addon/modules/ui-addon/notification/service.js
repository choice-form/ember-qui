import ArrayProxy from '@ember/array/proxy';
import { A } from '@ember/array';
import EmberObject from '@ember/object';
import { htmlSafe } from '@ember/string';
import { isNone } from '@ember/utils';
import { get } from '@ember/object';
import { set } from '@ember/object';
import { computed } from '@ember/object';
import { assign } from '@ember/polyfills';
import { later, cancel } from '@ember/runloop';
import RSVP from 'rsvp';

const DELAY_FOR_ANIMATION = 500;

// fix deprecation warning for v2.x
const ArrayProxyService = ArrayProxy.reopenClass({
  isServiceFactory: true
});

export default ArrayProxyService.extend({
  // proxy to a list of notifavation instances
  content: A(),

  // default duration to auto clear a notification
  defaultAutoClear: 3000,

  setDefaultAutoClear(autoClear) {
    set(this, 'defaultAutoClear', autoClear);
  },

  // create a notification
  /**
   * @class UiNotificationComponent(通知栏 --*)
   */


  /**
   * 通知栏
   *
   * @method create
   * @param {Object} option - 选项
   ``` javascript
   this.notification.create({
      type:'info',  //通知类型， 普通信息:'info', 警告:'warning', 报错: 'error', 成功: 'success'
      message: '<strong>This is an example info message!!!</strong>', //通知内容文字
      autoClear: 3000  //设置几秒钟后清除通知栏。 默认3000
    });
   ```

   ``` javascript
    你也可以直接使用以下方法：
   1、this.notification.info('<strong>This is an info message!!!</strong>', {
      autoClear: 2000
    })

   2、this.notification.error('<strong>This is an error message!!!</strong>', {
      autoClear: 2000
    })

   3、this.notification.warning('<strong>This is an warning message!!!</strong>', {
      autoClear: 2000
    })

   4、this.notification.success('<strong>This is an success message!!!</strong>', {
      autoClear: 2000
    })

   ```
   *
   * @return {*|Object}
   */



  create(options) {
    if (!options.message) {
      throw new Error('Notification needs message');
    }

    if (options.message === get(this, 'lastObject.message')) {
      return undefined;
    }

    if (options.html) {
      options.message = htmlSafe(options.message);
    }

    // info, success, warning, error
    options.type = options.type || 'info';

    // a number gt zero ? actual value : default value
    options.autoClear = isNone(options.autoClear) ? get(this, 'defaultAutoClear') : options.autoClear;

    const NotificationFactory = EmberObject.extend({
      countdownStyle: computed('autoClear', 'paused', function() {
        const duration = get(this, 'autoClear');
        const animationState = get(this, 'paused') ? 'paused' : 'running';
        return htmlSafe(`
          animation-duration: ${duration}ms;
          -webkit-animation-duration: ${duration}ms;
          animation-play-state: ${animationState};
          -webkit-animation-play-state: ${animationState}
        `);
      })
    });
    const notification = NotificationFactory.create(options);

    if (notification.autoClear) {
      set(notification, 'remaining', notification.autoClear);
      this.start(notification);
    }

    return this.pushObject(notification);
  },

  start(notification) {
    set(notification, 'timestamp', Date.now());

    const timer = later(this, () => {
      set(notification, 'remaining', false);
      this.includes(notification) && this.remove(notification); // if notification still exists
    }, get(notification, 'remaining'));

    set(notification, 'timer', timer);
  },

  pause(notification) {
    cancel(get(notification, 'timer'));

    const elapsed = Date.now() - get(notification, 'timestamp');
    const remaining = get(notification, 'remaining') - elapsed;

    set(notification, 'remaining', remaining);
  },

  remove(notification) {
    if (isNone(notification)) {
      return false;
    }

    set(notification, 'dismiss', true);

    return new RSVP.Promise(resolve => {
      later(this, () => {
        resolve(this.removeObject(notification))
      }, DELAY_FOR_ANIMATION);
    });
  },

  removeAll() {
    set(this, 'content', A());
  },

  // convinent helpers
  info(message, options = {}) {
    return this.create(assign({message, type: 'info'}, options));
  },
  success(message, options = {}) {
    return this.create(assign({message, type: 'success'}, options));
  },
  warning(message, options = {}) {
    return this.create(assign({message, type: 'warning'}, options));
  },
  error(message, options = {}) {
    return this.create(assign({message, type: 'error'}, options));
  }
});
