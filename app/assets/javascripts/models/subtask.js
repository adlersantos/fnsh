BC.Models.Subtask = Backbone.Model.extend({
  url: function (taskID) {
    return '/tasks/' + taskID + '/subtasks/'
  }
});