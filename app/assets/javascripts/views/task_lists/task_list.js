BC.Views.TaskList = Backbone.View.extend({
  initialize: function () {
    this.taskLists = this.collection;

    var that = this;
    var events = ["add", "change", "destroy"];
    _(events).each(function (event) {
      that.listenTo(that.taskLists, event, that.render)
    });
  },

  events: {
    "click a.delete-task-list": "deleteTaskList",
    "click .put-task-form": "putAddTaskForm",
    "click .cancel-add-task": "cancelAddTask"
  },

  template: JST['task_lists/task_list'],

  cancelAddTask: function (event) {
    $(event.currentTarget).parent().toggleClass('hidden');
    $(event.currentTarget).parent().prev().toggleClass('hidden');
  },

  deleteTaskList: function (event) {
    event.preventDefault();
    var that = this;

    var taskListID = BC.getID(event.currentTarget, 'task-list');
    var taskListToDelete = this.taskLists.get(taskListID);

    taskListToDelete.destroy();
  },

  putAddTaskForm: function (event) {
    $(event.currentTarget).toggleClass('hidden');
    $(event.currentTarget).next().toggleClass('hidden');
  },

  render: function () {
    var taskListTemplate = this.template({taskLists: this.taskLists});
    this.$el.html(taskListTemplate);
    return this;
  }
});