/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function () {

    mobiscroll.ember.list = function () {
        return mobiscroll.ember.getEmberMobiscrollView('list', undefined, undefined, listTemplate, 'ul');
    };

    Ember.Handlebars.helper('mobiscroll-list', mobiscroll.ember.list());

    function listTemplate() {
        return {
            layout: Ember.Handlebars.compile('<ul>{{yield}}</ul>')
        };
    }

})();
