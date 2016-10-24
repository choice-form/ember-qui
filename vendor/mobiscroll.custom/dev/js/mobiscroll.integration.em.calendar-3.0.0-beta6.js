/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function () {
    mobiscroll.ember.calendar = function () {
        return mobiscroll.ember.getEmberMobiscrollView('calendar');
    };

    Ember.Handlebars.helper('mobiscroll-calendar', mobiscroll.ember.calendar());

})();
