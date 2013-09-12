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
    "click button.create-task-list": "createTaskList",
    "sortupdate .task-lists": "updateSortableTaskList"
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
    this.$el.html(this.template({taskLists: this.taskLists}));

    var that = this;
    that.taskLists.each(function (taskList) {
      var id = taskList.get('id')
      that['taskList' + id].setElement(that.$('.task-list-' + id)).render();
    });

    return this;
  },

  updateSortableTaskList: function (event, ui) {
    var that = this;
    var taskListID = BC.getID(ui.item, 'task-list');
    var taskList = this['taskList' + taskListID].model;
    taskList.url = taskList.urlRoot() + taskList.get('id');

    var prevTaskListID = BC.getID(ui.item.prev(), 'task-list');
    var nextTaskListID = BC.getID(ui.item.next(), 'task-list');

    if (prevTaskListID && nextTaskListID) {

      var prevTaskList = this['taskList' + prevTaskListID].model;
      var nextTaskList = this['taskList' + nextTaskListID].model;
      var diff = nextTaskList.get('position') - prevTaskList.get('position');
      var newPosition = prevTaskList.get('position') + (diff / 2);

      taskList.save({position: newPosition}, {
        success: function (responseData) {
          that.taskLists.sort();
        },
        wait: true,
        silent: true
      });

    } else if (prevTaskListID) {

      var prevTaskList = this['taskList' + prevTaskListID].model;
      var newPosition = prevTaskList.get('position') + 1

      taskList.save({position: newPosition}, {
        success: function (responseData) {
          that.taskLists.sort();
        },
        wait: true,
        silent: true
      });

    } else if (nextTaskListID) {

      var nextTaskList = this['taskList' + nextTaskListID].model;
      var newPosition = nextTaskList.get('position') / 2;

      taskList.save({position: newPosition}, {
        success: function (responseData) {
          that.taskLists.sort();
        },
        wait: true,
        silent: true
      });
    }
  }
});