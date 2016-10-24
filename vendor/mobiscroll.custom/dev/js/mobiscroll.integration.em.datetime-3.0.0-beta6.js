/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function () {

    mobiscroll.ember.dateTime = function () {
        return mobiscroll.ember.getEmberMobiscrollView('datetime');
    };

    mobiscroll.ember.date = function () {
        return mobiscroll.ember.getEmberMobiscrollView('date');
    };

    mobiscroll.ember.time = function () {
        return mobiscroll.ember.getEmberMobiscrollView('time');
    };

    Ember.Handlebars.helper('mobiscroll-date-time', mobiscroll.ember.dateTime());
    Ember.Handlebars.helper('mobiscroll-date', mobiscroll.ember.date());
    Ember.Handlebars.helper('mobiscroll-time', mobiscroll.ember.time());

})();
