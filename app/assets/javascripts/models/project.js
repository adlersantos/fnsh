BC.Models.Project = Backbone.Model.extend({
  parse: function (data) {
    var projectUsers = new BC.Collections.Users(data.users);
    data.users = projectUsers;

    var projectTaskLists = new BC.Collections.TaskLists(data.task_lists);
    data.task_lists = projectTaskLists;

    return data;
  }
});