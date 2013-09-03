BC.Views.Project = Backbone.View.extend({
  events: {
    "click .project-name": "editProjectName"
  },

  template: JST['projects/project'],

  editProjectName: function (event) {
    var projectID = BC.getID(event.currentTarget, 'project');
    var projectModel = BC.projects.get(projectID);

    var editNameForm = new BC.Views.EditProject({model: projectModel});
    $('.project-name').remove()
    $('.project').prepend(editNameForm.render().$el)
  },

  render: function () {
    // debugger
    var projectTemplate = this.template({
      project: this.model,
      projectUsers: this.model.get('users')
    });

    this.$el.html(projectTemplate);
    return this;
  }
});