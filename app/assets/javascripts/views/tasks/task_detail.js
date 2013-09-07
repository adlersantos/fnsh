BC.Views.TaskDetail = Backbone.View.extend({
  initialize: function (opts) {
    this.task = opts['model'];
  },

  events: {
    "click span.task-detail-name": "putRenameTaskForm",
    "click .cancel-rename-task": "cancelRenameTask"
  },

  template: JST['tasks/details'],

  cancelRenameTask: function (event) {
    $('form.rename-task').toggleClass('hidden');
    $('form.rename-task').prev().toggleClass('hidden');
  },

  putRenameTaskForm: function (event) {
    event.preventDefault();
    $(event.currentTarget).toggleClass('hidden');
    $(event.currentTarget).next().toggleClass('hidden');
  },

  render: function () {
    var detailTemplate = this.template({
      task: this.task
    });
    this.$el.html(detailTemplate);
    return this;
  }
});