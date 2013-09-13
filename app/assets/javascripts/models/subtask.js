BC.Models.Subtask = Backbone.Model.extend({
  url: '/subtasks/',

  urlRoot: function (taskID) {
    return '/tasks/' + taskID + '/subtasks/'
  }
});