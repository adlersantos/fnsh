BC.Views.TaskList = Backbone.View.extend({
  initialize: function () {
    this.taskList = this.model
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
    "click .delete-task-list": "deleteTaskList",
    "click .put-add-task-form": "putAddTaskForm",
    "click .cancel-add-task": "cancelAddTask",
    "click button.add-task": "createTask",
    "click .delete-task": "deleteTask",
    "click input.task-checkbox": "toggleTaskCompletion",
    "click span.task-name": "showTaskDetail"
  },

  template: JST['task_lists/task_list'],

  cancelAddTask: function (event) {
    $(event.currentTarget).parent().toggleClass('hidden');
    $(event.currentTarget).parent().prev().toggleClass('hidden');
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
        that['task' + newTask.get('id')] = new BC.Views.Task({model: newTask})
        that.tasks.add(responseData);
      }
    });
  },

  // deleteTask: function (event) {
  //   event.preventDefault();

  //   var taskID = BC.getID(event.currentTarget, 'task');
  //   var task = BC.tasks.get(taskID);
  //   var taskListID = task.get('task_list_id');

  //   var taskList = this.taskLists.get(taskListID);
  //   var tasks = taskList.get('tasks');

  //   task.url = /projects/ + this.project.get('id')
  //               + '/task_lists/' + taskListID + '/tasks/' + task.get('id');

  //   task.destroy({
  //     wait: true
  //   });

  //   this.taskLists.fetch(function () {});
  // },

  deleteTaskList: function (event) {
    event.preventDefault();

    this.model.destroy();
  },

  putAddTaskForm: function (event) {
    $(event.currentTarget).toggleClass('hidden');
    $(event.currentTarget).next().toggleClass('hidden');
    $(event.currentTarget).next().find('input').focus();
  },

  // showTaskDetail: function (event) {
  //   var taskID = BC.getID(event.currentTarget, 'task');
  //   var task = BC.tasks.get(taskID);

  //   var taskDetailView = new BC.Views.TaskDetail({model: task});
  //   $('.task-details').html(taskDetailView.render().$el);
  // },

  // toggleTaskCompletion: function (event) {
  //   taskID = BC.getID(event.currentTarget, 'task');
  //   task = BC.tasks.get(taskID);

  //   if ($(event.currentTarget).is(":checked")) {
  //     task.set({finished: true});
  //     $(event.currentTarget).next().toggleClass('line-through');
  //     task.save();
  //   } else {
  //     task.set({finished: false});
  //     $(event.currentTarget).next().toggleClass('line-through');
  //     task.save();
  //   }

  //   BC.tasks.fetch();
  //   this.taskLists.fetch();

  //   var taskDetailView = new BC.Views.TaskDetail({model: task});
  //   taskDetailView.render();
  // },

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