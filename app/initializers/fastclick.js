export default {
  name: 'fastclick',

  initialize() {
    FastClick && FastClick.attach(document.body);
  }
};
