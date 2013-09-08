BC.Models.TaskList = Backbone.Model.extend({
  parse: function (data) {
    var tasks = new BC.Collections.Tasks(data.tasks);
    data.tasks = tasks;

    var project = new BC.Models.Project(data.project);
    data.project = project;

    console.log('--task list parsed--')
    console.log(data)
    return data;
  },

  urlRoot: function () {
    return '/projects/' + this.get('project_id') + '/task_lists/';
  }
});