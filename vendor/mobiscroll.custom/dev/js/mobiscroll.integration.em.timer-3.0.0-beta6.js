/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function () {

    mobiscroll.ember.timer = function () {
        return mobiscroll.ember.getEmberMobiscrollView('timer', renderer, reader);
    };

    Ember.Handlebars.helper('mobiscroll-timer', mobiscroll.ember.timer());

    var renderShield = {};

    function renderer(element, view, field) {
        if (!renderShield[element.attr('id')]) {
            var value = view.get('controller.model.' + field);
            if (value !== null && value !== undefined) {
                element.mobiscroll('setEllapsedTime', value);
                element.val(element.mobiscroll('getInst')._value);
            }
        }
    }

    function reader(element, view) {
        var field = view.get('value');
        var model = view.get('controller.model');
        renderShield[element.attr('id')] = true;
        model.set(field, element.mobiscroll('getEllapsedTime'));
        renderShield[element.attr('id')] = false;
    }

})();
