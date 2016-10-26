import Component from 'ember-component';
import layout from './template';
import styles from '../ui-control/control/styles';
import computed from 'ember-computed';
import get,{getProperties} from 'ember-metal/get'
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
    return  getProperties(question, ['prevButton', 'nextButton', 'question.handleEvents.handlePrevClick', 'question.handleEvents.handleNextClick']);
  }),


}).reopenClass({ positionalParams: ['question'] });
