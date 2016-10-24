/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function ($) {

    mobiscroll.ember.widget = function () {
        return mobiscroll.ember.getEmberMobiscrollView(widgetdInitFn, undefined, undefined, template, 'div');
    };

    Ember.Handlebars.helper('mobiscroll-widget', mobiscroll.ember.widget());

    function widgetdInitFn(inp, optObj, control, initExtends) {
        $.extend(optObj, {
            component: 'Widget'
        }, initExtends);
        inp.mobiscroll(optObj);
    }

    function template() {
        return {
            layout: Ember.Handlebars.compile('<div>{{yield}}</div>')
        };
    }

})(jQuery);
