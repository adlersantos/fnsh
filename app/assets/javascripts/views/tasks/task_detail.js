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
    "click span.task-detail-name": "putRenameTaskForm",
    "click .cancel-rename-task": "cancelRenameTask",
    "click .put-task-description-form": "putTaskDescriptionForm",
    "click .cancel-task-description": "cancelTaskDescription",
    "click .set-task-description": "setTaskDescription",
    "click p.task-description": "editTaskDescription",
    "click button.rename-task": "renameTask"
  },

  template: JST['tasks/details'],

  cancelRenameTask: function (event) {
    $('form.rename-task').toggleClass('hidden');
    $('form.rename-task').prev().toggleClass('hidden');
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

  editTaskDescription: function (event) {
    $('p.task-description').toggleClass('hidden');
    $('form.task-description').toggleClass('hidden');
    $('form.task-description textarea').focus();
  },

  putRenameTaskForm: function (event) {
    $(event.currentTarget).toggleClass('hidden');
    $(event.currentTarget).next().toggleClass('hidden');
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
    var detailTemplate = this.template({
      task: this.model
    });

    this.$el.html(detailTemplate);
    this.commentsView.setElement(this.$('.comments')).render();
    return this;
  },

  setTaskDescription: function (event) {
    event.preventDefault();
    var taskData = $('form.task-description').serializeJSON();
    this.model.url = this.model.urlRoot() + this.model.get('id');
    this.model.save(taskData, {wait: true});
  }
});