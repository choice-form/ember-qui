/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function () {

    mobiscroll.ember.temperature = function () {
        return mobiscroll.ember.getEmberMobiscrollView('temperature');
    };
    mobiscroll.ember.distance = function () {
        return mobiscroll.ember.getEmberMobiscrollView('distance');
    };
    mobiscroll.ember.speed = function () {
        return mobiscroll.ember.getEmberMobiscrollView('speed');
    };
    mobiscroll.ember.force = function () {
        return mobiscroll.ember.getEmberMobiscrollView('force');
    };
    mobiscroll.ember.mass = function () {
        return mobiscroll.ember.getEmberMobiscrollView('mass');
    };

    Ember.Handlebars.helper('mobiscroll-temperature', mobiscroll.ember.temperature());
    Ember.Handlebars.helper('mobiscroll-distance', mobiscroll.ember.distance());
    Ember.Handlebars.helper('mobiscroll-speed', mobiscroll.ember.speed());
    Ember.Handlebars.helper('mobiscroll-force', mobiscroll.ember.force());
    Ember.Handlebars.helper('mobiscroll-mass', mobiscroll.ember.mass());

})();
