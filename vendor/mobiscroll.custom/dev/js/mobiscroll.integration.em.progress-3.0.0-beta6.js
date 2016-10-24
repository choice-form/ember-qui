/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function ($) {

    mobiscroll.ember.progress = function () {
        return mobiscroll.ember.getEmberMobiscrollView(progressInitFn, undefined, undefined, progressTemplate, 'progress', undefined, undefined, true);
    };

    function progressInitFn(inp, optObj, control, initExtends) {
        $.extend(optObj, {
            component: 'Progress'
        }, initExtends);
        inp.mobiscroll(optObj);
    }

    function progressTemplate() {
        return {
            template: Ember.Handlebars.compile('<progress />')
        };
    }

    Ember.Handlebars.helper('mobiscroll-progress', mobiscroll.ember.progress());

})(jQuery);
