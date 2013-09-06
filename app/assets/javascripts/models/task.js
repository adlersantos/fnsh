BC.Models.Task = Backbone.Model.extend({
  parse: function (data) {
    var taskList = new BC.Models.TaskList(data.task_list);
    data.task_list = taskList;

    return data;
  }
});