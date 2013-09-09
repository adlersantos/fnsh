BC.Models.Task = Backbone.Model.extend({
  parse: function (data) {
    var taskList = new BC.Models.TaskList(data.task_list);
    data.task_list = taskList;

    data.project_id = data.project.id
    return data;
  },

  urlRoot: function () {
    return '/projects/' + this.get('project_id') + '/task_lists/'
      + this.get('task_list_id') + '/tasks/';
  }
});