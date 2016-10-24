/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function () {

    mobiscroll.ember.range = function () {
        return mobiscroll.ember.getEmberMobiscrollView('range', undefined);
    };

    Ember.Handlebars.helper('mobiscroll-range', mobiscroll.ember.range());

})();
