BC.Views.Project = Backbone.View.extend({
  initialize: function () {
  },

  template: JST['projects/project'],

  render: function () {
    var projectTemplate = this.template({project: this.model});

    this.$el.html(projectTemplate)
    return this;
  }
});