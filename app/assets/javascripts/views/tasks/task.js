BC.Views.Task = Backbone.View.extend({

  template: JST['tasks/task'],

  render: function () {
    this.$el.html(this.template({task: this.model}));
    return this;
  }
});