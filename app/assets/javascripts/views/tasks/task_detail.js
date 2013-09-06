BC.Views.TaskDetail = Backbone.View.extend({
  initialize: function (opts) {
    this.task = opts['model'];
  },

  template: JST['tasks/details'],

  render: function () {
    var detailTemplate = this.template({
      task: this.task
    });
    $('.task-details').html(detailTemplate);
  }
});