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
    "click a.delete-task-list": "deleteTaskList"
  },

  template: JST['task_lists/task_list'],

  deleteTaskList: function (event) {
    event.preventDefault();
    var that = this;

    var taskListID = BC.getID(event.currentTarget, 'task-list');
    var taskListToDelete = this.taskLists.get(taskListID);

    taskListToDelete.destroy();
  },

  render: function () {
    var taskListTemplate = this.template({taskLists: this.taskLists});
    this.$el.html(taskListTemplate);
    return this;
  }
});