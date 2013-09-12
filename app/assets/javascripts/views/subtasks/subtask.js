BC.Views.Subtask = Backbone.View.extend({

  events: {
    "click .delete-subtask": "deleteSubtask",
    "click input.subtask-checkbox": "toggleSubtaskCompletion",
  },

  template: JST['subtasks/subtask'],

  deleteSubtask: function (event) {
    event.preventDefault();

    this.model.url = '/subtasks/' + this.model.get('id');
    this.model.destroy();
  },

  render: function () {
    this.$el.html(this.template({subtask: this.model}));
    return this;
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