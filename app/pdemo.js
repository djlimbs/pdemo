// Kick off Ember
App = Ember.Application.create({
    rootElement: '#application'
});

App.CustomListComponent = Ember.Component.extend({
    layoutName: 'components/customList',
    attributeBindings: ['name', 'items', 'remoteActionName'],
    actions: {
        insertListItem: function() {
            var self = this;
            var itemToAdd = this.get('itemToAdd');

            cont[remoteActionName](itemToAdd, function(res, evt) {
                if (res === true) {
                    self.get('items').addObject(itemToAdd);
                    self.set('itemToAdd', null);
                }
            });
        }
    }
});

App.MainController = Ember.ObjectController.extend({    
    actions: {
        insertSkill: function () {
            var self = this;
            var skillToAdd = this.get('skillToAdd');

            cont.saveSkill(skillToAdd, function(res, evt) {
                if (res === true) {
                    self.get('skills').addObject(skillToAdd);
                    self.set('skillToAdd', null);
                }
            });
        }
    }
});

App.MainRoute = Ember.Route.extend({
    model: function() {
        return {
            skills: parsedSkillsMap.skills.getEach('Name')
        };
    }
});

// Router
App.Router.map(function() {
    this.resource('main', { path: '/' });
});


// This setting disables the detail routing from showing up in the navbar.
App.Router.reopen( {
    location: 'none'
});

