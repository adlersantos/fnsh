BC.Views.Subtask = Backbone.View.extend({

  events: {
    "click .delete-subtask": "deleteSubtask",
    "click input.subtask-checkbox": "toggleSubtaskCompletion",
    "click span.subtask-name": "putRenameSubtaskForm",
    "click .cancel-rename-subtask": "cancelRenameSubtask",
    "click button.rename-subtask": "renameSubtask"
  },

  template: JST['subtasks/subtask'],

  cancelRenameSubtask: function (event) {
    $(event.currentTarget).parent().toggleClass('hidden');
    $(event.currentTarget).parent().prev().toggleClass('hidden');
  },

  deleteSubtask: function (event) {
    event.preventDefault();

    this.model.url = '/subtasks/' + this.model.get('id');
    this.model.destroy();
  },

  renameSubtask: function (event) {
    event.preventDefault();

    var subtaskData = $(event.currentTarget).parent().serializeJSON();
    this.model.url = '/subtasks/' + this.model.get('id');
    this.model.save(subtaskData, {wait: true});
  },

  render: function () {
    this.$el.html(this.template({subtask: this.model}));
    return this;
  },

  putRenameSubtaskForm: function (event) {
    $('form.rename-subtask').not('.hidden').toggleClass('hidden');
    $('span.subtask-name.hidden').toggleClass('hidden');
    $(event.currentTarget).toggleClass('hidden');
    $(event.currentTarget).next().toggleClass('hidden');
    $(event.currentTarget).next().find('input').focus();
  },

  toggleSubtaskCompletion: function (event) {
    this.model.url = '/subtasks/' + this.model.get('id');

    if (this.model.get('finished')) {
      this.model.save(
        {subtask: {finished: false}},
        {wait: true}
      );
    } else {
      this.model.save(
        {subtask: {finished: true}},
        {wait: true}
      );
    }
  }
});