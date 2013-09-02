BC.Views.EditProject = Backbone.View.extend({

  events: {
    "click .submit-edit-project": "editProjectHandler"
  },

  template: JST['projects/edit_project'],

  render: function () {
    var editProjForm = this.template({project: this.model});

    this.$el.html(editProjForm);
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
        console.log('project created')
      }
    });
  }
});