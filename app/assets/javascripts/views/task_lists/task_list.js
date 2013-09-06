BC.Views.TaskList = Backbone.View.extend({
  initialize: function () {
    this.project = this.model;
    this.taskLists = this.collection;

    var that = this;
    var events = ["add", "change", "destroy"];
    _(events).each(function (event) {
      that.listenTo(that.taskLists, event, that.render);
    });
  },

  events: {
    "click .delete-task-list": "deleteTaskList",
    "click .put-add-task-form": "putAddTaskForm",
    "click .cancel-add-task": "cancelAddTask",
    "click button.add-task": "createTask",
    "click .delete-task": "deleteTask",
    "click input.task-checkbox": "toggleTaskCompletion"
  },

  template: JST['task_lists/task_list'],

  cancelAddTask: function (event) {
    $(event.currentTarget).parent().toggleClass('hidden');
    $(event.currentTarget).parent().prev().toggleClass('hidden');
  },

  createTask: function (event) {
    event.preventDefault();
    var that = this;

    var taskListID = BC.getID(event.currentTarget, 'task-list');
    var taskList = this.taskLists.get(taskListID);
    var tasks = taskList.get('tasks');

    tasks.url = /projects/ + this.project.get('id') + '/task_lists/' + taskListID + '/tasks'
    var taskData = $(event.currentTarget.parentElement).serializeJSON();

    tasks.create(taskData, {
      success: function (responseData) {
        console.log('TASK CREATED!');
        console.log(responseData);
      },
      wait: true
    });

    BC.tasks.fetch();
    this.taskLists.fetch(function () {});
  },

  deleteTask: function (event) {
    event.preventDefault();

    var taskID = BC.getID(event.currentTarget, 'task');
    var task = BC.tasks.get(taskID);
    var taskListID = task.get('task_list_id');

    var taskList = this.taskLists.get(taskListID);
    var tasks = taskList.get('tasks');

    task.url = /projects/ + this.project.get('id')
                + '/task_lists/' + taskListID + '/tasks/' + task.get('id');

    task.destroy({
      wait: true
    });

    this.taskLists.fetch(function () {});
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

    BC.tasks.fetch();
    this.taskLists.fetch();
  },

  render: function () {
    var taskListTemplate = this.template({taskLists: this.taskLists});
    this.$el.html(taskListTemplate);
    return this;
  }
});