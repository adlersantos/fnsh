BC.Views.Task = Backbone.View.extend({

  template: JST['tasks/task'],

  events: {
    "click .delete-task": "deleteTask",
    "click input.task-checkbox": "toggleTaskCompletion",
    "click span.task-name": function (event) {
      this.showTaskDetail(event);
      this.putRenameTaskForm(event);
    },
    "click .cancel-inline-rename-task": "cancelRenameTask",
    "click button.rename-inline-task": "renameTask"
  },

  cancelRenameTask: function (event) {
    $(event.currentTarget).parent().toggleClass('hidden');
    $(event.currentTarget).parent().prev().toggleClass('hidden');
  },

  deleteTask: function (event) {
    event.preventDefault();

    this.model.url = this.model.urlRoot() + this.model.get('id');
    this.model.destroy();
  },

  putRenameTaskForm: function (event) {
    $('form.rename-inline-task').not('.hidden').toggleClass('hidden');
    $('span.task-name.hidden').toggleClass('hidden');
    $(event.currentTarget).toggleClass('hidden');
    $(event.currentTarget).next().toggleClass('hidden');
    $(event.currentTarget).next().find('input').focus();
  },

  renameTask: function (event) {
    event.preventDefault();

    var taskData = $(event.currentTarget).parent().serializeJSON();
    this.model.url = this.model.urlRoot() + this.model.get('id');
    this.model.save(taskData, {wait: true});
  },

  render: function () {
    this.$el.html(this.template({task: this.model}));
    return this;
  },

  showTaskDetail: function (event) {
    var taskDetailView = new BC.Views.TaskDetail({model: this.model});
    $('.task-detail').html(taskDetailView.render().$el);
  },

  toggleTaskCompletion: function (event) {
    this.model.url = this.model.urlRoot() + this.model.get('id');

    if (this.model.get('finished')) {
      this.model.save(
        {task: {finished: false}},
        {wait: true}
      );
    } else {
      this.model.save(
        {task: {finished: true}},
        {wait: true}
      );
    }
  }
});