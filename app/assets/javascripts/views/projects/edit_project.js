BC.Views.EditProject = Backbone.View.extend({

  events: {
    "click input.rename-project": "renameProject",
    "click input.cancel-rename-project": "cancelRenameProject"
  },

  template: JST['projects/edit_project'],

  render: function () {
    var editProjForm = this.template({project: this.model});

    this.$el.html(editProjForm);
    return this;
  },

  cancelRenameProject: function (event) {
    BC.regenerateProjectView(event);
  },

  renameProject: function (event) {
    event.preventDefault();

    projectData = $('form.edit-project').serialize();
    projectID = BC.getID(event.currentTarget, 'project');
    project = BC.projects.get(projectID);

    $.ajax({
      url: '/projects/' + projectID,
      type: "PUT",
      data: projectData,
      dataType: 'json',
      success: function (responseData) {
        console.log('project updated!');
        project.fetch({
          success: function () {
            BC.regenerateProjectView(project);
          }
        });
        // debugger
      }
    });
  }
});