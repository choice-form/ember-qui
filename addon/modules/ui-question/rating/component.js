import Component from 'ember-component';
import layout from './template';
import computed, { equal } from 'ember-computed';
import get from 'ember-metal/get';
import { htmlSafe } from 'ember-string';

export default Component.extend({
  layout,
  tagName: '',

  text: computed('option.text', {
    get() {
      return get(this, 'option.text')
        ? htmlSafe(`<span>${get(this, 'option.text')}</span>`) : null
    }
  }).readOnly(),

  isTextMode: equal('option.inputType', 'input').readOnly(),

  ratingClassName: computed('option.count', function() {
    return `rating-wrapper score-${get(this, 'option.count')}`;
  }).readOnly(),

  graphs: computed('option.{count,value,icon,emoji}', function () {
    const { count, value, icon: graph, emoji } = get(this, 'option');
    const randomId = new Date().getTime();

    let array = [];
    for(let i = 0; i < +count; i++){
      array[i] = {
        renderId: randomId + i,
        value: i + 1,
      };

      if (i < +value ) {
        array[i].icon = graph + '-active';
        array[i].checked = true;
        emoji && emoji.length == 2 && (array[i].emoji = emoji[1]);
      } else {
        array[i].icon = graph;
        array[i].checked = false;
        emoji && emoji.length == 2 && (array[i].emoji = emoji[0]);
      }
    }
    return array;
  }).readOnly(),

  actions: {
    handleOptionClick(e){
      const success = this.handleEvents.handleOptionInput(
        e.currentTarget.value, get(this, 'option'), get(this, 'node')
      )
      !success && e.preventDefault();
    },

    handleOptionInput({ currentTarget: { value }}){
      this.handleEvents.handleOptionInput(value, get(this, 'option'), get(this, 'node'));
    },

    handleOptionInputForTextarea({ currentTarget: target }){
      this.handleEvents.handleOptionInput(
        target.value, get(this, 'option'), get(this, 'node')
      );

      target.style.height = `auto`;
      target.style.height = `${target.scrollHeight + 2}px`;
    },
  }
}).reopenClass({ positionalParams: ['node', 'option', 'handleEvents'] });
