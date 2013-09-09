BC.Views.TaskLists = Backbone.View.extend({
  initialize: function () {
    this.project = this.model;
    this.taskLists = this.collection;

    var that = this;
    that.taskLists.each(function (taskList) {
      that['taskList' + taskList.get('id')] = new BC.Views.TaskList({model: taskList});
    });

    var events = ["add", "change", "destroy"];
    _(events).each(function (event) {
      that.listenTo(that.taskLists, event, that.render);
    });
  },

  template: JST['task_lists/task_lists'],

  events: {
    "click a.put-task-list-form": "putCreateTaskListForm",
    "click button.cancel-create-task-list": "cancelCreateTaskList",
    "click button.create-task-list": "createTaskList"
  },

  cancelCreateTaskList: function (event) {
    $('a.put-task-list-form').toggleClass('hidden');
    $('form.create-task-list').toggleClass('hidden');
  },

  createTaskList: function (event) {
    event.preventDefault();

    var taskListData = $('form.create-task-list').serializeJSON();
    var newTaskList = new BC.Models.TaskList(taskListData);

    taskListData.url = '/projects/' + this.project.get('id') + '/task_lists';
    newTaskList.url = taskListData.url;

    var that = this;
    newTaskList.save(taskListData, {
      success: function (responseData) {
        that['taskList' + newTaskList.get('id')] = new BC.Views.TaskList({model: newTaskList});
        that.taskLists.add(responseData);
      },
      wait: true
    });
  },

  putCreateTaskListForm: function (event) {
    $('a.put-task-list-form').toggleClass('hidden');
    $('form.create-task-list').toggleClass('hidden');
    $('form.create-task-list input').focus();
  },

  render: function () {
    this.$el.html(this.template({taskLists: this.taskLists}))

    var that = this;
    that.taskLists.each(function (taskList) {
      var id = taskList.get('id')
      that['taskList' + id].setElement(that.$('.task-list-' + id)).render();
    });

    return this;
  }
});