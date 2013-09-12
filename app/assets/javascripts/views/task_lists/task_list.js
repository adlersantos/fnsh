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
    "click button.rename-task-list": "renameTaskList",
    "click .delete-task-list": "deleteTaskList",
    "click .put-add-task-form": "putAddTaskForm",
    "click .cancel-add-task": "cancelAddTask",
    "click button.add-task": "createTask",
    "sortupdate .tasks": "updateSortableTask"
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
    var prevEvent = event;
    newTask.save(taskData, {
      success: function (responseData) {
        that['task' + newTask.get('id')] = new BC.Views.Task({model: newTask});
        that['task' + newTask.get('id')].setElement(that.$('.task-' + newTask.get('id')));
        that.tasks.add(responseData);
        that.$el.find('.put-add-task-form').trigger('click');
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

  renameTaskList: function (event) {
    event.preventDefault();

    var taskListData = $(event.currentTarget).parent().serializeJSON();
    this.model.url = this.model.urlRoot() + this.model.get('id');
    this.model.save(taskListData, {wait: true});
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
  },

  updateSortableTask: function (event, ui) {
    var that = this;
    var taskID = BC.getID(ui.item, 'task');
    var task = this['task' + taskID].model;
    task.url = '/tasks/' + task.get('id');

    var prevTaskID = BC.getID(ui.item.prev(), 'task');
    var nextTaskID = BC.getID(ui.item.next(), 'task');

    if (prevTaskID && nextTaskID) {

      var prevTask = this['task' + prevTaskID].model;
      var nextTask = this['task' + nextTaskID].model;
      var diff = nextTask.get('position') - prevTask.get('position');
      var newPosition = prevTask.get('position') + (diff / 2);

      task.save({task: {position: newPosition}}, {
        success: function (responseData) {
          that.tasks.sort();
        },
        wait: true,
        silent: true
      });

    } else if (prevTaskID) {

      var prevTask = this['task' + prevTaskID].model;
      var newPosition = prevTask.get('position') + 1

      task.save({task: {position: newPosition}}, {
        success: function (responseData) {
          that.tasks.sort();
        },
        wait: true,
        silent: true
      });

    } else if (nextTaskID) {

      var nextTask = this['task' + nextTaskID].model;
      var newPosition = nextTask.get('position') / 2;

      task.save({task: {position: newPosition}}, {
        success: function (responseData) {
          that.tasks.sort();
        },
        wait: true,
        silent: true
      });
    }
    event.stopPropagation();
  }
});