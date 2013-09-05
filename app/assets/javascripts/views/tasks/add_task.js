BC.Views.AddTask = Backbone.View.extend({

  events: {
  },

  template: JST['tasks/add_task'],

  render: function () {
    var addTaskForm = this.template;
    this.$el.html(addTaskForm);
    return this;
  }
});