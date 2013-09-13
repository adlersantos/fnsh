BC.Collections.Tasks = Backbone.Collection.extend({

  model: BC.Models.Task,

  url: '/tasks/',

  comparator: function (task) {
    return task.get('position');
  }
});