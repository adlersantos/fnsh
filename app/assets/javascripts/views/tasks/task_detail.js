BC.Views.TaskDetail = Backbone.View.extend({
  initialize: function (opts) {
    this.task = opts['model'];
  },

  events: {
    "enterKey .task-description": "test"
  },

  test: function (event) {
    event.preventDefault();
    console.log('ENTER!!!!');
  },

  template: JST['tasks/details'],

  render: function () {
    var detailTemplate = this.template({
      task: this.task
    });
    $('.task-details').html(detailTemplate);
  }
});