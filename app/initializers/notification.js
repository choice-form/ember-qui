export default {
  name: 'notification',

  initialize(application) {
    application.inject('route', 'notification', 'service:ui-addon/notification');
    application.inject('component', 'notification', 'service:ui-addon/notification');
    application.inject('controller', 'notification', 'service:ui-addon/notification');
  }
};
