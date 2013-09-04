BC.Views.Task = Backbone.View.extend({

  template: JST['tasks/tasks'],

  render: function () {
    var tasksTemplate = this.template({tasks: taskList.get('tasks')});
    this.$el.html(tasksTemplate);
    return this;
  }
});