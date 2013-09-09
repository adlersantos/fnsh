BC.Views.TaskDetail = Backbone.View.extend({
  initialize: function () {
    this.task = this.model;

    var that = this;
    var events = ["add", "change", "destroy"];
    _(events).each(function (event) {
      that.listenTo(that.task, event, that.render);
    });
  },

  events: {
    "click span.task-detail-name": "putRenameTaskForm",
    "click .cancel-rename-task": "cancelRenameTask",
    "click button.rename-task": "renameTask"
  },

  template: JST['tasks/details'],

  cancelRenameTask: function (event) {
    $('form.rename-task').toggleClass('hidden');
    $('form.rename-task').prev().toggleClass('hidden');
  },

  putRenameTaskForm: function (event) {
    $(event.currentTarget).toggleClass('hidden');
    $(event.currentTarget).next().toggleClass('hidden');
    $('textarea.task-name').focus();
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
    return this;
  }
});