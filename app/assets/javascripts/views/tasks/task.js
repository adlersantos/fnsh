BC.Views.Task = Backbone.View.extend({

  template: JST['tasks/task'],

  events: {
    "click .delete-task": "deleteTask",
    "click input.task-checkbox": "toggleTaskCompletion",
    "click span.task-name": "showTaskDetail"
  },

  deleteTask: function (event) {
    event.preventDefault();

    this.model.url = this.model.urlRoot() + this.model.get('id');
    this.model.destroy();
  },

  render: function () {
    this.$el.html(this.template({task: this.model}));
    return this;
  },

  toggleTaskCompletion: function (event) {
    this.model.url = this.model.urlRoot() + this.model.get('id');

    if (this.model.get('finished')) {
      this.model.save(
        {task: {finished: false}},
        {wait: true}
      );
    } else {
      this.model.save(
        {task: {finished: true}},
        {wait: true}
      );
    }
  }
});