BC.Views.TaskList = Backbone.View.extend({
  initialize: function () {
    this.taskList = this.model;
    this.tasks = this.model.get('tasks');

    var that = this;
    that.tasks.each(function (task) {
      that['task' + task.get('id')] = new BC.Views.Task({model: task});
    });

    var events = ["add", "change", "destroy"];
    _(events).each(function (event) {
      that.listenTo(that.tasks, event, that.render);
    });
  },

  events: {
    "click .put-rename-task-list-form": "putRenameTaskListForm",
    "click .cancel-rename-task-list": "cancelRenameTaskList",
    "click .delete-task-list": "deleteTaskList",
    "click .put-add-task-form": "putAddTaskForm",
    "click .cancel-add-task": "cancelAddTask",
    "click button.add-task": "createTask"
  },

  template: JST['task_lists/task_list'],

  cancelAddTask: function (event) {
    $(event.currentTarget).parent().toggleClass('hidden');
    $(event.currentTarget).parent().prev().toggleClass('hidden');
  },

  cancelRenameTaskList: function (event) {
    $(event.currentTarget).parent().parent().toggleClass('hidden');
    $(event.currentTarget).parent().parent().next().toggleClass('hidden');
  },

  createTask: function (event) {
    event.preventDefault();


    var taskData = $(event.currentTarget.parentElement).serializeJSON();
    var newTask = new BC.Models.Task(taskData);

    taskData.url = '/projects/' + this.taskList.get('project_id')
                     + '/task_lists/' + this.taskList.get('id') + '/tasks/';
    newTask.url = taskData.url;

    var that = this;
    newTask.save(taskData, {
      success: function (responseData) {
        that['task' + newTask.get('id')] = new BC.Views.Task({model: newTask});
        that.tasks.add(responseData);
      }
    });
  },

  deleteTaskList: function (event) {
    event.preventDefault();

    this.model.url = this.model.urlRoot() + this.model.get('id');
    this.model.destroy();
  },

  putAddTaskForm: function (event) {
    $(event.currentTarget).toggleClass('hidden');
    $(event.currentTarget).next().toggleClass('hidden');
    $(event.currentTarget).next().find('input').focus();
  },

  putRenameTaskListForm: function (event) {
    $(event.currentTarget).parent().prev().toggleClass('hidden');
    $(event.currentTarget).parent().toggleClass('hidden');
    $(event.currentTarget).parent().prev().find('input').focus();
  },

  render: function () {
    var taskListTemplate = this.template({
      taskList: this.taskList,
      tasks: this.tasks
    })

    this.$el.html(taskListTemplate);

    var that = this;
    that.tasks.each(function (task) {
      var id = task.get('id')
      that['task' + id].setElement(that.$('.task-' + id)).render();
    });

    return this;
  }
});