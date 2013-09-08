BC.Views.Task = Backbone.View.extend({

  template: JST['tasks/task'],

  events: {
    "click .delete-task": "deleteTask",
    "click input.task-checkbox": "toggleTaskCompletion"
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
    if (this.model.get('finished')) {
      this.model.set('finished', false);
    } else {
      this.model.set('finished', true);
    }

    this.model.save();
  }
});