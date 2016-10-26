import Component from 'ember-component';
import layout from './template';
import styles from '../ui-control/control/styles';
import computed from 'ember-computed';
import get from 'ember-metal/get'
import set from 'ember-metal/set'
import inject from 'ember-service/inject';

export default Component.extend({
  layout, styles,
  tagName:'section',
  uiService: inject('ui'),


  /**
   * 将button的数据打包到一起
   */
  buttonData:computed('question', function () {
    const question = get(this, 'question');
    return  Ember.getProperties(question, ['prevButton', 'nextButton', 'question.handleEvents.handlePrev', 'question.handleEvents.handleNext']);
  }),


  actions: {
    submit() {
      console.log(get(this, 'question'));
    }
  }

}).reopenClass({ positionalParams: ['question'] });
