BC.Views.TaskDetail = Backbone.View.extend({
  initialize: function () {
    this.task = this.model;
    this.comments = this.task.get('comments');
    this.commentsView = new BC.Views.Comments({
      model: this.task,
      collection: this.comments
    });

    var that = this;
    var events = ["add", "change", "destroy"];
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
    "click .clear-due-date": "clearDueDate"
  },

  template: JST['tasks/details'],

  assignTask: function (event) {
    var assigneeID = BC.getID(event.currentTarget, 'user');

    this.model.url = this.model.urlRoot() + this.model.get('id');
    this.model.save(
      {task: {assignee_id: assigneeID}},
      {wait: true}
    );
  },

  cancelRenameTask: function (event) {
    $('span.task-detail-name').toggleClass('hidden');
    $('form.rename-task').toggleClass('hidden');
  },

  cancelTaskDescription: function (event) {
    event.preventDefault();

    if (this.model.get('description')) {
      $('p.task-description').toggleClass('hidden');
      $('form.task-description').toggleClass('hidden');
    } else {
      $('.put-task-description-form').toggleClass('hidden');
      $('form.task-description').toggleClass('hidden');
    }
  },

  clearDueDate: function (event) {
    event.preventDefault();
    console.log('CLEARRRRED DUEEEE');

    this.model.url = this.model.urlRoot() + this.model.get('id');
    this.model.save(
      {task: {due_date: null}},
      {wait: true}
    );
  },

  editTaskDescription: function (event) {
    $('p.task-description').toggleClass('hidden');
    $('form.task-description').toggleClass('hidden');
    $('form.task-description textarea').focus();
  },

  putRenameTaskForm: function (event) {
    $('span.task-detail-name').toggleClass('hidden');
    $('form.rename-task').toggleClass('hidden');
    $('textarea.task-name').focus();
  },

  putTaskDescriptionForm: function (event) {
    $('.put-task-description-form').toggleClass('hidden');
    $('form.task-description').toggleClass('hidden');
    $('form.task-description textarea').focus();
  },

  renameTask: function (event) {
    event.preventDefault();
    var taskData = $('form.rename-task').serializeJSON();
    this.model.url = this.model.urlRoot() + this.model.get('id');
    this.model.save(taskData, {wait: true});
  },

  render: function () {
    if (this.model.get('due_date')) {
      var dateObject = new Date(this.model.get('due_date') * 1000);
      var dateString = dateObject.toString().split(' ').slice(1, 4).join(' ');
    }

    var detailTemplate = this.template({
      task: this.model,
      assignee: BC.ProjectUsers.get(this.model.get('assignee_id')),
      dueDate: dateString
    });

    this.$el.html(detailTemplate);
    this.commentsView.setElement(this.$('.comments')).render();
    return this;
  },

  setDueDate: function (event) {
    var dueDate = event.date / 1000;

    this.model.url = this.model.urlRoot() + this.model.get('id');
    this.model.save(
      {task: {due_date: dueDate}},
      {wait: true}
    );
  },

  setTaskDescription: function (event) {
    event.preventDefault();
    var taskData = $('form.task-description').serializeJSON();
    this.model.url = this.model.urlRoot() + this.model.get('id');
    this.model.save(taskData, {wait: true});
  },

  toggleTaskCompletion: function (event) {
    var taskStatus = !this.model.get('finished');
    this.model.url = this.model.urlRoot() + this.model.get('id');
    this.model.save({task: {finished: taskStatus}}, {wait: true});
  },

  unassignTask: function (event) {
    event.preventDefault();
    this.model.url = this.model.urlRoot() + this.model.get('id');
    this.model.save(
      {task: {assignee_id: null}},
      {wait: true}
    );
  }
});