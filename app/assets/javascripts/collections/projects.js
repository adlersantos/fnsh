BC.Collections.Projects = Backbone.Collection.extend({

  model: BC.Models.Project,

  url: '/projects/',

  comparator: function (project) {
    return project.get('name');
  }

});
