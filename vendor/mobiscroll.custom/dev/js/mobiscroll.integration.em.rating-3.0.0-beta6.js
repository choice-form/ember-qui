/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function () {

    mobiscroll.ember.rating = function () {
        return mobiscroll.ember.getEmberMobiscrollView('rating', undefined);
    };

    Ember.Handlebars.helper('mobiscroll-rating', mobiscroll.ember.rating());

})();
