BC.Models.Project = Backbone.Model.extend({
  parse: function (data) {
    var projectUsers = new BC.Collections.Users(data.users);
    data.users = projectUsers;

    var projectTaskLists = new BC.Collections.TaskLists(data.task_lists);
    data.task_lists = projectTaskLists;

    data.task_lists.each(function (taskList) {
      var tasks = new BC.Collections.Tasks(taskList.get('tasks'));
      taskList.set('tasks', tasks);

      taskList.get('tasks').each(function (task) {
        var comments = new BC.Collections.Comments(task.get('comments'));
        task.set('comments', comments);
      })
    });

    return data;
  },

  urlRoot: function () {
    return /projects/;
  }
});