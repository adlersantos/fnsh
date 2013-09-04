BC.Models.TaskList = Backbone.Model.extend({
  parse: function (data) {
    var tasks = new BC.Collections.Tasks(data.tasks);
    data.tasks = tasks;

    return data;
  }

});