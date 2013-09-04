BC.Views.AddTask = Backbone.View.extend({

  events: {
    "click .cancel-add-task": "cancelAddTask"
  },

  template: JST['tasks/add_task'],

  cancelAddTask: function (event) {
    $('form.add-task').hide();
    $('a.put-task-form').show();
  },

  render: function () {
    var addTaskForm = this.template;
    this.$el.html(addTaskForm);
    return this;
  }
});