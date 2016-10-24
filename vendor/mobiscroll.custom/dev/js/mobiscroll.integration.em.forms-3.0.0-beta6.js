/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function ($) {
    mobiscroll.ember.form = function () {
        return mobiscroll.ember.getEmberMobiscrollView(formInitFunction, undefined, undefined, formTemplate, null);
    };

    mobiscroll.ember.stepper = function () {
        return mobiscroll.ember.getEmberMobiscrollView(stepperInitFn, undefined, undefined, stepperTemplate);
    };

    mobiscroll.ember['switch'] = function () {
        return mobiscroll.ember.getEmberMobiscrollView(switchInitFn, undefined, undefined, switchTemplate, undefined, undefined, undefined, true);
    };

    Ember.Handlebars.helper('mobiscroll-form', mobiscroll.ember.form());
    Ember.Handlebars.helper('mobiscroll-stepper', mobiscroll.ember.stepper());
    Ember.Handlebars.helper('mobiscroll-switch', mobiscroll.ember['switch']());

    function formTemplate() {
        return {
            layout: Ember.Handlebars.compile('{{yield}}')
        };
    }

    function formInitFunction(form, options) {
        form.mobiscroll().form(options).attr('mbsc-form-opt', '');
        mobiscroll.ember.formOptions[form.attr('id')] = {
            theme: options.theme,
            lang: options.lang
        };
    }

    function stepperInitFn(inp, optObj, control, initExtends) {
        $.extend(optObj, {
            component: 'Stepper'
        }, initExtends);
        inp.mobiscroll(optObj);
    }

    function stepperTemplate() {
        return {
            template: Ember.Handlebars.compile('<input type="number" data-role="stepper" />')
        };
    }

    function switchInitFn(inp, optObj, control, initExtends) {
        $.extend(optObj, {
            component: 'Switch'
        }, initExtends);
        inp.mobiscroll(optObj);
    }

    function switchTemplate() {
        return {
            template: Ember.Handlebars.compile('<input type="checkbox" data-role="switch" />')
        };
    }

})(jQuery);
