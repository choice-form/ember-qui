/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function () {

    mobiscroll.ember.timespan = function () {
        return mobiscroll.ember.getEmberMobiscrollView('timespan');
    };

    Ember.Handlebars.helper('mobiscroll-timespan', mobiscroll.ember.timespan());

})();
