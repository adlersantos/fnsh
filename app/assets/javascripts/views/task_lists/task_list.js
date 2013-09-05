BC.Views.TaskList = Backbone.View.extend({
  initialize: function () {
    this.project = this.model;
    this.taskLists = this.collection;

    var that = this;
    var events = ["add", "change", "destroy"];
    _(events).each(function (event) {
      that.listenTo(that.taskLists, event, that.render)
    });
  },

  events: {
    "click .delete-task-list": "deleteTaskList",
    "click .put-add-task-form": "putAddTaskForm",
    "click .cancel-add-task": "cancelAddTask",
    "click button.add-task": "createTask",
    "click .delete-task": "deleteTask"
  },

  template: JST['task_lists/task_list'],

  cancelAddTask: function (event) {
    $(event.currentTarget).parent().toggleClass('hidden');
    $(event.currentTarget).parent().prev().toggleClass('hidden');
  },

  createTask: function (event) {
    event.preventDefault();
    var that = this;

    var addTaskForm = $(event.currentTarget).parent();
    var taskData = addTaskForm.serialize();

    $.ajax({
      url: '/projects/' + that.project.get('id'),
      type: 'PUT',
      data: taskData,
      dataType: 'json',
      success: function (responseData) {
        console.log(responseData);
        that.project.fetch({
          success: function () {
            BC.regenerateProjectView(that.project);
            console.log(responseData);
          }
        });
      }
    });
  },

  deleteTask: function (event) {
    event.preventDefault();
    var that = this;

    var taskID = BC.getID(event.currentTarget, 'task');
    var taskToDelete = this.taskLists.get(taskListID);

    $.ajax({
      url: '/tasks/' + taskID,
      type: 'DELETE',
      dataType: 'json',
      success: function (responseData) {
        console.log(responseData);
        that.project.fetch({
          success: function () {
            BC.regenerateProjectView(that.project);
          }
        });
      }
    });
  },

  deleteTaskList: function (event) {
    event.preventDefault();
    var that = this;

    var taskListID = BC.getID(event.currentTarget.parentElement, 'task-list');
    var taskListToDelete = this.taskLists.get(taskListID);

    taskListToDelete.destroy();
  },

  putAddTaskForm: function (event) {
    $(event.currentTarget).toggleClass('hidden');
    $(event.currentTarget).next().toggleClass('hidden');
    BC.inputFocus();
  },

  render: function () {
    var taskListTemplate = this.template({taskLists: this.taskLists});
    this.$el.html(taskListTemplate);
    return this;
  }
});