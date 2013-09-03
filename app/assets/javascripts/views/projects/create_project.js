BC.Views.CreateProject = Backbone.View.extend({
  initialize: function (opts) {
    this.model = opts['model'];
  },

  events: {
    "click input.create-project": "createProjectHandler",
    "click input.cancel-create-project": "cancelCreateProject"
  },

  template: JST['projects/create_project'],

  render: function () {
    var newProjForm = this.template({shownProject: this.model});

    this.$el.html(newProjForm);
    return this;
  },

  cancelCreateProject: function (event) {
    BC.regenerateProjectView(this.model);
  },

  createProjectHandler: function (event) {
    event.preventDefault();

    var projectData = $('form.create-project').serializeJSON();
    $('.project').empty();

    BC.projects.create(projectData);
    BC.projects.fetch(function () {});
  }
});