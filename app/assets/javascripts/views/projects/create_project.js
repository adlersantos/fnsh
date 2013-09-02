BC.Views.CreateProject = Backbone.View.extend({

  events: {
    "click input.create-project": "createProjectHandler"
  },

  template: JST['projects/create_project'],

  render: function () {
    var newProjForm = this.template;

    this.$el.html(newProjForm);
    return this;
  },

  createProjectHandler: function (event) {
    event.preventDefault();

    projectData = $('form.create-project').serialize();

    $.ajax({
      url: '/projects',
      type: "POST",
      data: projectData,
      dataType: 'json',
      success: function (responseData) {
        console.log('project created');
        $('.projects').empty();
        BC.projects.fetch(function () {});
      }
    });
  }
});