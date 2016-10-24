/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function ($) {

    mobiscroll.ember.slider = function () {
        return mobiscroll.ember.getEmberMobiscrollView(sliderInitFn, undefined, undefined, sliderTemplate, undefined, undefined, undefined, true);
    };

    function sliderInitFn(inp, optObj, control, initExtends) {
        $.extend(optObj, {
            component: 'Slider'
        }, initExtends);
        inp.mobiscroll(optObj);
    }

    function sliderTemplate() {
        return {
            template: Ember.Handlebars.compile('<input type="range" />')
        };
    }

    Ember.Handlebars.helper('mobiscroll-slider', mobiscroll.ember.slider());

})(jQuery);
