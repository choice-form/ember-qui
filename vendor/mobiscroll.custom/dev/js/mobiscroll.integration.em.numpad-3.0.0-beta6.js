/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function ($) {
    mobiscroll.ember.numpad = function () {
        return mobiscroll.ember.getEmberMobiscrollView(numpadInitFn);
    };

    Ember.Handlebars.helper('mobiscroll-numpad', mobiscroll.ember.numpad());

    function numpadInitFn(inp, optObj, control, initExtends) {
        $.extend(optObj, {
            component: 'Numpad'
        }, initExtends);
        inp.mobiscroll(optObj);
    }

})(jQuery);
