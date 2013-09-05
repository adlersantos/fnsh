BC.Collections.Tasks = Backbone.Collection.extend({
  model: BC.Models.Task,
  url: function () {
    console.log('----getting tasks-------');
    return '/tasks/';
  }
});