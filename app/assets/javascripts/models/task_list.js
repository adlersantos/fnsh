BC.Models.TaskList = Backbone.Model.extend({
  parse: function (data) {
    var tasks = new BC.Collections.Tasks(data.tasks);
    data.tasks = tasks;

    console.log('--task list parsed--')
    console.log(data)
    return data;
  }

});