BC.Views.CreateProject = Backbone.View.extend({
  initialize: function (opts) {
    this.model = opts['model'];
  },

  events: {
    "click input.create-project": "createProject",
    "click input.cancel-create-project": "cancelCreateProject"
  },

  template: JST['projects/create_project'],

  render: function () {
    var newProjForm = this.template({shownProject: this.model});

    this.$el.html(newProjForm);
    return this;
  },

  cancelCreateProject: function (event) {
    $('.project').empty();
  },

  createProject: function (event) {
    event.preventDefault();

    var projectData = $('form.create-project').serializeJSON();
    $('.project').empty();

    BC.projects.create(projectData, {
      success: function (responseData) {
        BC.projects.fetch({wait: true});
      },
      wait: true
    });
  }
});