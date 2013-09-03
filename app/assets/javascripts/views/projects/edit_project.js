BC.Views.EditProject = Backbone.View.extend({

  events: {
    "click input.edit-project": "editProjectHandler",
    "click input.cancel-edit-project": "cancelEditProject"
  },

  template: JST['projects/edit_project'],

  render: function () {
    var editProjForm = this.template({project: this.model});

    this.$el.html(editProjForm);
    return this;
  },

  cancelEditProject: function (event) {
    $('.project').empty();
  },

  editProjectHandler: function (event) {
    event.preventDefault();

    projectData = $('form.edit-project').serialize();
    projectID = BC.getID(event.currentTarget, 'project');

    $.ajax({
      url: '/projects/' + projectID,
      type: "PUT",
      data: projectData,
      dataType: 'json',
      success: function (responseData) {
        console.log('project updated!');
        BC.projects.fetch(function () {});
      }
    });
  }
});