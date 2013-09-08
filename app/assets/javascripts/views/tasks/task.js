BC.Views.Task = Backbone.View.extend({

  template: JST['tasks/task'],

  events: {
    "click .delete-task": "deleteTask",
    "click input.task-checkbox": "toggleTaskCompletion"
  },

  deleteTask: function (event) {
    this.model.destroy();
  },

  render: function () {
    this.$el.html(this.template({task: this.model}));
    return this;
  },

  toggleTaskCompletion: function (event) {
    taskID = BC.getID(event.currentTarget, 'task');
    task = BC.tasks.get(taskID);

    if ($(event.currentTarget).is(":checked")) {
      task.set({finished: true});
      $(event.currentTarget).next().toggleClass('line-through');
      task.save();
    } else {
      task.set({finished: false});
      $(event.currentTarget).next().toggleClass('line-through');
      task.save();
    }

    var taskDetailView = new BC.Views.TaskDetail({model: task});
    taskDetailView.render();
  }
});