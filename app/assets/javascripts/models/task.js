BC.Models.Task = Backbone.Model.extend({
  parse: function (data) {
    var taskList = new BC.Models.TaskList(data.task_list);
    data.task_list = taskList;

    var comments = new BC.Collections.Comments(data.comments);
    data.comments = comments;

    var subtasks = new BC.Collections.Subtasks(data.subtasks);
    data.subtasks = subtasks;

    return data;
  },

  url: '/tasks/',

  urlRoot: function (taskListID) {
    return '/task_lists/' + taskListID + '/tasks';
  }
});