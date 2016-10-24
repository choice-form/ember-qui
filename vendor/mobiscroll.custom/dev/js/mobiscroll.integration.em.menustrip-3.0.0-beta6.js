/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function ($) {

    mobiscroll.ember.menustrip = function () {
        return mobiscroll.ember.getEmberMobiscrollView(menustripdInitFn, undefined, undefined, listTemplate, 'ul');
    };

    Ember.Handlebars.helper('mobiscroll-menustrip', mobiscroll.ember.menustrip());

    function menustripdInitFn(inp, optObj, control, initExtends) {
        $.extend(optObj, {
            component: 'MenuStrip'
        }, initExtends);
        inp.mobiscroll(optObj);
    }

    function listTemplate() {
        return {
            layout: Ember.Handlebars.compile('<ul>{{yield}}</ul>')
        };
    }

})(jQuery);
