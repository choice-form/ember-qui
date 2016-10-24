/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function () {

    mobiscroll.ember.eventCalendar = function () {
        return mobiscroll.ember.getEmberMobiscrollView('eventcalendar', eventRenderer, function () {}, undefined /*custom template*/ , undefined /*element selector*/ , {
            data: []
        }, {
            willChange: function () {},
            didChange: eventRenderer
        });
    };

    Ember.Handlebars.helper('mobiscroll-eventcalendar', mobiscroll.ember.eventCalendar());

    function eventRenderer(element, view, field) {
        var value = view.get('controller.model.' + field);
        if (value !== null && value !== undefined) {
            element.mobiscroll('setEvents', value);
        }
    }

})();
