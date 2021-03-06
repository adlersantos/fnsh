BC.Views.TaskDetail = Backbone.View.extend({
  initialize: function () {
    this.task = this.model;
    this.comments = this.task.get('comments');
    this.subtasks = this.task.get('subtasks');

    this.commentsView = new BC.Views.Comments({
      model: this.task,
      collection: this.comments
    });

    this.subtasksView = new BC.Views.Subtasks({
      model: this.task,
      collection: this.subtasks
    });

    var that = this;
    var events = ["change"];
    _(events).each(function (event) {
      that.listenTo(that.task, event, that.render);
    });
  },

  events: {
    "click h3.task-detail-name": "putRenameTaskForm",
    "click .cancel-rename-task": "cancelRenameTask",
    "click .put-task-description-form": "putTaskDescriptionForm",
    "click .cancel-task-description": "cancelTaskDescription",
    "click .set-task-description": "setTaskDescription",
    "click p.task-description": "editTaskDescription",
    "click button.rename-task": "renameTask",
    "click li.assignee": "assignTask",
    "click .unassign-task": "unassignTask",
    "click button.task-detail-finished": "toggleTaskCompletion",
    "changeDate .task-due-date": "setDueDate",
    "click .clear-due-date": "clearDueDate",
    "click .put-add-subtask-form": "putAddSubTaskForm",
    "click .cancel-add-subtask": "cancelAddSubTask"
  },

  template: JST['tasks/details'],

  assignTask: function (event) {
    var assigneeID = BC.getID(event.currentTarget, 'user');

    this.model.url = '/tasks/' + this.model.get('id');
    this.model.save(
      {task: {assignee_id: assigneeID}},
      {wait: true}
    );
  },

  cancelAddSubTask: function (event) {
    $('.put-add-subtask-form, form.create-subtask').toggleClass('hidden');
  },

  cancelRenameTask: function (event) {
    $('span.task-detail-name, form.rename-task').toggleClass('hidden');
  },

  cancelTaskDescription: function (event) {
    event.preventDefault();

    if (this.model.get('description')) {
      $('p.task-description, form.task-description').toggleClass('hidden');
    } else {
      $('.put-task-description-form, form.task-description').toggleClass('hidden');
    }
  },

  clearDueDate: function (event) {
    event.preventDefault();

    this.model.url = '/tasks/' + this.model.get('id');
    this.model.save(
      {task: {due_date: null}},
      {wait: true}
    );
  },

  editTaskDescription: function (event) {
    $('p.task-description, form.task-description').toggleClass('hidden');
    $('form.task-description textarea').focus();
  },

  putAddSubTaskForm: function (event) {
    $('.put-add-subtask-form, form.create-subtask').toggleClass('hidden');
  },

  putRenameTaskForm: function (event) {
    $('span.task-detail-name, form.rename-task').toggleClass('hidden');
    $('textarea.task-name').focus();
  },

  putTaskDescriptionForm: function (event) {
    $('.put-task-description-form, form.task-description').toggleClass('hidden');
    $('form.task-description textarea').focus();
  },

  renameTask: function (event) {
    event.preventDefault();
    var taskData = $('form.rename-task').serializeJSON();
    this.model.url = '/tasks/' + this.model.get('id');
    this.model.save(taskData, {wait: true});
  },

  render: function () {
    if (this.model.get('due_date')) {
      var dateToday = new Date();
      dateToday.setHours(0, 0, 0, 0);
      var taskDueDate = new Date(this.model.get('due_date') * 1000);
      var dateString = taskDueDate.toString().split(' ').slice(1, 4).join(' ');

      var dueDate = {dateString: dateString};

      if (dateToday < taskDueDate) {
        dueDate['color'] = 'label-info';
      } else if (dateToday > taskDueDate) {
        dueDate['color'] = 'label-danger';
      } else {
        dueDate['color'] = 'label-success';
        dueDate['dateString'] = 'Today';
      }

    }

    var detailTemplate = this.template({
      task: this.model,
      assignee: BC.ProjectUsers.get(this.model.get('assignee_id')),
      dueDate: dueDate
    });

    this.$el.html(detailTemplate);
    this.commentsView.setElement(this.$('.comments')).render();
    this.subtasksView.setElement(this.$('.subtasks')).render();

    return this;
  },

  setDueDate: function (event) {
    var dueDate = event.date / 1000;

    this.model.url = '/tasks/' + this.model.get('id');
    this.model.save(
      {task: {due_date: dueDate}},
      {wait: true}
    );
  },

  setTaskDescription: function (event) {
    event.preventDefault();
    var taskData = $('form.task-description').serializeJSON();
    this.model.url = '/tasks/' + this.model.get('id');
    this.model.save(taskData, {wait: true});
  },

  toggleTaskCompletion: function (event) {
    var taskStatus = !this.model.get('finished');
    this.model.url = '/tasks/' + this.model.get('id');
    this.model.save({task: {finished: taskStatus}}, {wait: true});
  },

  unassignTask: function (event) {
    event.preventDefault();
    this.model.url = '/tasks/' + this.model.get('id');
    this.model.save(
      {task: {assignee_id: null}},
      {wait: true}
    );
  }
});